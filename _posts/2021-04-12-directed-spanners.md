---
title: "Directed K-Spanners: Combo Graphs and the Star-Spangled Spanner"
author: Ben Coleman
layout: post
background: '/assets/img/2020-07-10-background.jpg'
---

Graph spanners are important for graph applications where we want to reduce the number of edges in a graph without affecting the navigability of the graph. 


<img src="/assets/img/2020-04-12/spanner-example.png" style="display:block; margin-left: auto; margin-right: auto;" width="800">

We want to remove edges while preserving important properties of the graph.

## What is a Graph Spanner

Given an input graph $$G = (V,E)$$, a graph spanner is a subgraph $$G_s \subseteq G$$ with the k-spanner property.

**K-Spanner Property**: For all edges $$(u,v) \in G$$, the spanner graph $$G_s$$ contains a path between $$u$$ and $$v$$ of length no greater than $$k$$.

The goal is to delete as many edges as possible from $$G$$ while still preserving this property. This is NP-hard (even if you are working with special, structured graphs), so people use various heuristics to approximate the optimal solution. 

The focus of graph spanner research is to develop algorithms that are *classically* efficient - that is, polynomial algorithms. Note that a polylogarithmic rumtime is not immediately efficient in practice - $$O(N^3)$$ is a polynomial but is prohibitively expensive for the large-scale problems I work on. 

The efficiency requirement means that certain parts of spanner algorithms may not be implementable, but it turns out most of the basic ideas are both classically and practically efficient. This post will examine directed graph spanners from a practical implementation perspective.

## Combo Graphs

I call the first kind of directed graph spanner a *combo graph*. The idea is to break the $$G$$ into two sets of edges, and to compute a spanner for each set. Then, we combine the spanners to obtain a spanner for the overall graph.


<img src="/assets/img/2020-04-12/combo-spanner.png" style="display:block; margin-left: auto; margin-right: auto;" width="800">

For example, we could break this graph's edges into the red group and the dark blue group based on some decision criterion (we'll describe this later). Once we satisfy the k-spanner property for the edges in each group, we merge the graphs back together. 


#### Pruning: Thick and Thin

There are several spanners based on combo graphs in the literature [1-3]. These algorithms rely on the idea of *thick* and *thin* edges. The thick and thin edges form the two groups that we talked about in the previous section. We satisfy the k-spanner property for each set of edges separately and merge the results later. 

For the thick edges, we use a random sampling algorithm. For the thin edges, we use a linear programming algorithm followed by sampling. The final graph is the union of the two edge sets.

**Thick Edge:** Let $$(V_{st},E_{st})$$ be the subgraph of all paths between nodes $$s$$ and $$t$$ of length $$\leq k$$. The edge $$(s,t)$$ is a thick edge if $$\|V_{st}\|\geq N/\beta$$ (otherwise, it's a thin edge).

The value of $$\beta$$ is set so that the algorithm has favorable theoretical guarantees. For example, in [1] they use $$\beta = \sqrt{N}$$ and $$\beta = N^{1/3}$$. 

To determine whether an edge is thick or thin, we can use depth-first search to find all paths of length $$\leq k$$ from $$s$$. Of these paths, some may connect $$s$$ and $$t$$ - we can find $$\|V_{st}\|$$ by counting the number of nodes involved in these paths. 

Here is an implementation using networkx in Python.

{% highlight python %}
import networkx as nx

def measure_thickness(G,s,t,k):
	# G = networkx DiGraph
	# s,t = nodes
	# k = max path length 
	# returns |V_(s,t)| (subgraph induced by paths of length <= k)
	paths = nx.all_simple_paths(G, s, t, cutoff = k)
	V = set()
	for path in paths: 
		for node in path: 
			V.add(node)
	return len(V)

# Example for k=2 spanner
G = nx.DiGraph()
G = nx.random_k_out_graph(10, 4, 1.0, self_loops=False)
G.add_edge(0,1) # ensure that edge exists
V_01 = measure_thickness(G,0,1,2)


{% endhighlight %}

To implement the algorithms from [1-3], we need to check the thickness of all the edges in the graph. I am not sure whether this can be accomplished faster than $$O(N^2)$$, but there are probably more efficient ways to do it than my naive networkx implementation. In particular, I suspect that we can do a small number of breadth-first walks through the graph rather than a depth-first search for every edge.


#### Pruning the Thick Edges

To get a spanner for thick edges, we use a random sampling algorithm. The algorithm does the following:

1. Select a random node $$v$$ from the graph
2. Grow a shortest-path tree (in-arborescence) from the in-connections of $$v$$
3. Grow a shortest-path tree (out-arborescence) from the out-connections of $$v$$
4. Add the in-arborescence and out-arborescence to the spanner
5. Repeat this process $$\beta \log N$$ times
6. Check whether the k-spanner condition has been satisfied for all thick edges. If not, add edges until it is.

In Python, this might look like the following pseudocode. Note that we would also need to implement the arborescence functions and the coverage check logic, and I'm not sure how expensive this would be. It's probably also more efficient to check the coverage status of all edges at once.

{% highlight python %}

# Et is a list of all thick edges in G, i.e. tuples (u,v)
Es = set() # spanner edges
n_iterations = int( beta * log(N) )

for i in range(n_iterations):
	v = random.choice(G.nodes())
	Tv_in = in_arborescence(G,v)
	Tv_out = out_aborescence(G,v)
	Es = Es.union(Tv_in)
	Es = Es.union(Tv_out)

for u,v in Et:
	if not is_covered(Es, u, v):
		Es.add( (u,v) )

{% endhighlight %}



#### Pruning the Thin Edges

There are two steps to pruning the set of thin edges. First, we solve a linear programming problem to get a set of probabilities (one for each node in the graph). Then, we sample edges according to these probabilities. 

Specifically, we create a variable $$x_e$$ for each edge in the graph. This variable determines whether edge $$e$$ is going to be part of the spanner. Our task is to minimize the sum of $$x_e$$ values while obeying the constraints of the k-spanner condition.


It turns out that because $$x_e$$ is constrained to $$\{0,1\}$$, we have an NP-hard combinatoric optimization problem. This is hard so solve, so we choose to relax the problem to $$x_e \geq 0$$ instead, yielding a linear programming relaxation. 

$$ \mathrm{argmin} \sum_{e \in E} x_e \qquad \text{subject to } \ge \|E\| \text{ constraints}$$

See [1-3] for details about the constraints. Once we have the (possibly fractional) values of $$x_e$$, we use randomized rounding. That is, we include an edge $$e$$ in the spanner with probability proportional to $$x_e$$.

{% highlight python %}
def randomized_rounding(x, G):
	# x is the set of probabilities found via LP, indexed like a dictionary (s,t)->value
	# G is a networkx DiGraph
	# returns set of edges
	N = G.number_of_nodes()
	Es = [] # set of edges in spanner
	for s,t in G.edges():
		prob = x[(s,t)] * sqrt(N) * log(N)
		if (random.uniform(0, 1) < prob): 
			Es.append((s,t))
	return Es 

{% endhighlight %}

The algorithms in [1] and [2] use one version of the linear programming formulation, while the one in [3] uses a different linear program. There are also different linear programs for weighted and unweighted graphs. But at the end of the day, the algorithms all solve a highly-constrained linear program and sample edges based on the results. 

Since the randomized rounding program might fail to cover all the thin edges, we have to check that all the thin edges are covered (just like we did for the thick edges).

#### Combining the Graphs

Once we have the two edge sets, we simply merge them to obtain the final spanner. Although it seems like the union of the two sets will contain many edges, the theoretical results in [1-3] show that the spanner should actually be pretty sparse.

#### Implementation Notes

There are many good ideas in this algorithm, but I do not think that it is directly implementable for the large-scale graphs that I work on. We need to make some practical changes.

**Linear Programming is Hard:** The linear programming problem is probably too hard to solve for large graphs, because there will be millions of variables and millions of inequality constraints. My experience with linear programming is that systems with a few thousand variables and constraints are solvable on a laptop but the problem quickly becomes intractable with more variables.

**Running Away from Linear Programming:** We may not have to solve the linear programming problem. We may be able to get away with simply including all the thin edges, without seriously inflating the number of edges in the spanner. There are two reasons why.

First, for sufficiently large values of $$k$$, the set of thin edges could be very small. This is especially true for "well-behaved" and navigable graphs, where most of the nodes will participate in paths that span the majority of the graph (i.e. have $$\|V_{st}\|\geq \sqrt{N}$$). 

The second reason is that we are sampling edges based on the probability $$\min(1, \sqrt{N}\log N x_e)$$. For large graphs, $$\sqrt{N}\log N x_e$$ could possibly be large - much larger than 1. For example, with $$N \approx 10^6$$, we would need $$x_e < 7\times 10^{-5}$$ to have a chance of deleting an edge with this algorithm. So even if we were to solve the linear programming problem, we might not get a large edge savings. 

**How to set $$\beta$$:** The $$\beta$$ parameter controls how many edges are classified as thick edges and also decides the number of arborescences we randomly sample. Therefore, it may be tempting to set $$\beta = O(N)$$, so that all of the edges are thick edges. Sadly, the *worst-case* expected number of edges in the spanner is a factor of $$\beta$$ worse than the minimal number of edges, so this could lead to bad behavior on pathological input graphs.

**A Practical Algorithm:** I suspect that it is sufficient in practice to run the random sampling algorithm a fixed (small) number of times, then manually add the uncovered thick edges and thin edges. While this does not preserve the worst-case theoretical guarantees for the number of edges in the spanner, it seems reasonable to expect good performance for well-behaved graphs.


## Star-Spangled Spanners

The second type of graph spanner uses a generalization of *star graphs* to construct the spanner. Star graphs are graphs where each 

For directed graphs, stars are a little more complicated - there is a tree of in-connections and a tree of out-connections. For example, here is a 2-star:

<img src="/assets/img/2020-04-12/l-star.png" style="display:block; margin-left: auto; margin-right: auto;" width="300">

We say that an edge is *covered* by the star if the star graph satisfies the k-spanner condition for that edge. The key insight in [4] is that we can use star graphs to cover all the edges in a graph. The final spanner can be found by intersecting all of the stars. 

To see how this is possible, observe that the following star could cover any of the red edges between nodes (for a k-spanner with $$k = 4$$). If we include this star in the spanner, we don't need to include any of the red edges (unless they're part of another star in the spanner). This is because the star contains an alternative path of length $$k \leq 4$$ for all of the red edges.

<img src="/assets/img/2020-04-12/star-coverage.png" style="display:block; margin-left: auto; margin-right: auto;" width="300">

#### Covering the Graph with Stars

The idea behind the algorithm is to sample a set of stars that cover the whole graph, while minimizing the number of edges. For example, here is a graph that is partially covered by two stars that are rooted at the green nodes.

<img src="/assets/img/2020-04-12/cover-graph-with-stars.png" style="display:block; margin-left: auto; margin-right: auto;" width="600">

The algorithm from [4] is as follows: 
1. Find the stars associated with each node in the graph. 
2. Find the set of edges covered by each star with a path of length $$\leq k$$.
3. Pick a *minimal cost* set of stars that cover the entire graph.

This is a weighted set-cover problem, and it is NP-complete. That means we will need to use a heuristic to get the spanner graph. The paper uses a simple greedy heuristic.

<!-- #### Greedy Weighted Set Cover -->


## References

[1] ["Improved Approximation for the Directed Spanner Problem"](http://grigory.us/files/k-spanner-algo-ICALP2011.pdf) (ICALP 2011)

[2] ["Approximation Algorithms for Spanner Problems and Directed Steiner Forest"](http://www.cse.psu.edu/~sxr48//pubs/BBMRY13.pdf) (Elsevier Information and Computation 2013)

[3] ["Directed Spanners via Flow-Based Linear Programs"](https://arxiv.org/abs/1011.3701) (STOC 2011)

[4] ["Finding Sparser Directed Spanners"](https://drops.dagstuhl.de/opus/volltexte/2010/2883/pdf/37.pdf) (FSTTCS 2010)


