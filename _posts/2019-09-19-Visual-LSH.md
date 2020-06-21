---
title: A visual introduction to locality-sensitive hashing (LSH)
author: Ben Coleman
layout: post
background: '/assets/img/2019-08-11-background.jpg'
---

Locality sensitive hashing is an incredibly useful trick. It was originally introduced for near-neighbor search but is also helpful for sketching algorithms and high-dimensional data analysis.

### What is LSH?
An ordinary hash function $$H(x)$$ maps two elements to the same hash bin with uniform probability. A *locality sensitive* hash (LSH) function $$L(x)$$ maps similar elements to the same hash bin with high probability. Elements that are not similar only collide with low probability. As an example, consider the situation shown below where we form two hash tables - one using a LSH function $$L(x)$$ and the other using a universal hash function $$H(x)$$. Observe that $$L(x)$$ preserves most of the clusters from the original dataset and that the elements in each hash bin are visually similar. The key intuition behind LSH is that LSH functions tend to group similar elements together into hash bins. 

<img src="/assets/img/2019-09-19-LSH-vs-random.png" width="800">

#### LSH collision probabilities

We say that a hash collision occurs when two items $$x$$ and $$y$$ have the same hash value. For example, all of the red dots collide in the figure above. The collision probability of a LSH function is $$\text{Pr}[L(x) = L(y)]$$, which we sometimes refer to as $$p(x,y)$$. Each LSH function is a member of a LSH family, which is a set of functions that all behave in similar ways. LSH families are formally defined and characterized in terms of their collision probabilities [1].

**Definition 1: Locality Sensitive Hash Family**\\
We say that a hash family $$\mathcal{H}$$ is $$(R, cR, p_1, p_2)$$-sensitive with respect to a distance function $$d(x,y)$$ if for any $$h \in \mathcal{H}$$ we have that
- If $$ d(x,y) \leq R$$ then $$\text{Pr}_{\mathcal{H}}[h(x) = h(y)] \geq p_1$$
- If $$ d(x,y) \geq cR$$ then $$\text{Pr}_{\mathcal{H}}[h(x) = h(y)] \leq p_2$$

The definition is really just a formalization of our intuition. Suppose we have the dataset shown below. We are given a query and want to identify similar items from the dataset. Definition 1 says that if we randomly select a LSH function from the hash family $$\mathcal{H}$$, then all of the points in the red ball have a good chance (probability $$ \geq p_1$$) of colliding with the query. All of the points in the blue shaded region have a small chance (probability $$\leq p_2$$) of colliding, and the definition does not specify what will happen to the gray points in between. The LSH algorithm for near-neighbor search is a straightforward extension of this idea. 

<img src="/assets/img/2019-09-19-LSH-definition.png" style="display:block; margin-left: auto; margin-right: auto;" width="400">

Next, we'll introduce LSH functions for some common distance measures. While there are many LSH functions in the literature, a few of them are overwhelmingly common in practice.

### Bit Sampling LSH

<img src="/assets/img/2019-09-19-bit-sampling.png" width="600">

Bit sampling is one of the simplest and cheapest LSH functions. It is associated with the Hamming distance. Given two $$n$$-length bitvectors $$\mathbf{x}$$ and $$\mathbf{y}$$, the Hamming distance $$d(\mathbf{x},\mathbf{y})$$ is the number of bits that are different between the two vectors. Bit sampling is a LSH family where 

$$ h_i(\mathbf{x}) = x_i \in \{0,1\}$$

That is, we choose a random index $$i$$ between 0 and $$n-1$$ and have the LSH function output the binary value $$x_i$$. To find the collision probability, observe that the number of indices for which $$x_i = y_i$$ is $$n - d(\mathbf{x},\mathbf{y})$$. To have a collision, we must randomly choose one of these indices. This yields the following expression for collision probability. 

$$ p(\mathbf{x},\mathbf{y}) = 1 - \frac{d(\mathbf{x},\mathbf{y})}{n}$$


### Signed Random Projections

<img src="/assets/img/2019-09-19-SRP-example.png" width="700">

Signed random projections (SRP) also output binary values, but they take vector inputs and are sensitive to the angular distance. To construct a SRP hash for a vector $$\mathbf{x} \in \mathbb{R}^n$$, generate a Gaussian distributed vector $$\mathbf{w} \in \mathbb{R}^n$$ and compute 

$$ h(\mathbf{x}) = \mathrm{sign}(\mathbf{w}^{\top}\mathbf{x})$$

The image shows the hash bins for a single SRP (left) and for three SRP hashes (right). The projection vector $$\mathbf{w}$$ is a normal vector to a decision boundary - all points on either side of the boundary have the same hash value. This function is sensitive to the angle between two vectors because if we draw a random hyperplane in $$\mathbb{R}^n$$, the probability that the plane divides two points $$\mathbf{x}$$ and $$\mathbf{y}$$ is related to the angle $$\theta(\mathbf{x},\mathbf{y})$$. Formalizing this idea, we obtain

$$ p(\mathbf{x},\mathbf{y}) = 1 - \frac{\theta(\mathbf{x},\mathbf{y})}{\pi}$$

The illustration in $$\mathbb{R}^2$$ should provide some intuition for why this is the case. The probability that $$h(\mathbf{x}) \neq h(\mathbf{y})$$ is the probability that a randomly chosen line falls between the two vectors. In practice, the projections are allowed to be sparse. Many elements of $$\mathbf{w}$$ may be zero without affecting the locality-sensitive property. As a result, this hash function can be very fast when sparse random projections are used. For more information, see [2,3]. 

<img src="/assets/img/2019-09-19-SRP-definition.png" style="display:block; margin-left: auto; margin-right: auto;" width="400">


### Euclidean and Manhattan LSH

<img src="/assets/img/2019-09-19-p-stable.png" style="display:block; margin-left: auto; margin-right: auto;" width="400">

The LSH functions for the Euclidean (L2) and Manhattan (L1) distances are based on the p-stable LSH scheme introduced in [4]. Similar to SRP, these LSH functions are also based on random projections that cut $$\mathbb{R}^n$$ into pieces. Each piece becomes a hash bin. Instead of taking the sign of the projection, we simply round down. This produces hash bins that repeat in the direction of $$\mathbf{w}$$ instead of a single decision boundary as with SRP. 

$$ h(\mathbf{x}) = \Big\lfloor \frac{\mathbf{w}^{\top}\mathbf{x} + b}{r}\Big\rfloor $$

The user-defined parameter $$r$$ determines the width of each hash bin while $$b$$ is a uniform random variable in the range $$[0,r]$$. A Gaussian distribution for $$\mathbf{w}$$ results in a LSH function for the Euclidean distance, while a Cauchy distribution produces a Manhattan distance LSH. Unlike the previous LSH functions, this hash maps to the entire set of integers. The analytic expression for the collision probability is complicated to write down but a closed-form expression is available in [4]. Rather than reproduce the expression, we provide plots of $$p(x,y)$$ against $$d(x,y)$$ for various choices of $$r$$. The plot is for the Euclidean LSH, but the results for Manhattan distance are similar. 


### Clustering LSH


<img src="/assets/img/2019-09-19-clustering-LSH.png" style="display:block; margin-left: auto; margin-right: auto;" width="400">

Clustering LSH is an example of a LSH function that can be made data-dependent. The idea is to find a set of cluster centers $$\mathcal{C}$$ that do a good job of approximating the dataset. These centers might be found using k-means clustering, convex clustering, or any other data clustering method. We could also have selected cluster centers randomly or on a grid, but we may need a larger number for a performant LSH function. Once we have the cluster centers, we assign an integer value to each one. Given an object to hash, we find the nearest center and output its index. 

$$ h(x) =\underset{1 \leq i \leq |\mathcal{C}|}{\mathrm{arg\,min\:}} d(x,c_i)$$

It is easy to show that this function is locality-sensitive but much harder to specify the collision probability, since collisions depend on the set of learned cluster centers $$\mathcal{C}$$. To give some geometric intuition for this LSH, observe that the hash bins for $$h(x)$$ are the same as the Voronoi cells for the set of centroids. 

### MinHash
MinHash is a LSH function for sets rather than for vectors. The probability that two sets collide under MinHash is equal to the Jaccard similarity of the sets, which is roughly a measure of how much the two sets overlap. The details are non-trivial and require an in-depth explanation that is beyond the scope of this post. However, we still wanted to mention MinHash since it is a powerful technique with many practical applications. 

### References

[1] Indyk, P., & Motwani, R. (1998, May). Approximate nearest neighbors: towards removing the curse of dimensionality. In *Proceedings of the thirtieth annual ACM symposium on Theory of computing* (pp. 604-613). ACM.

[2] Li, P., Hastie, T. J., & Church, K. W. (2006, August). Very sparse random projections. In *Proceedings of the 12th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining* (pp. 287-296). ACM.

[3] Achlioptas, D. (2001, May). Database-friendly random projections. In *Proceedings of the twentieth ACM SIGMOD-SIGACT-SIGART symposium on Principles of database systems* (pp. 274-281). ACM.

[4] Datar, M., Immorlica, N., Indyk, P., & Mirrokni, V. S. (2004, June). Locality-sensitive hashing scheme based on p-stable distributions. In *Proceedings of the twentieth annual symposium on Computational geometry* (pp. 253-262). ACM.

[Photo Credit] Jeremy Bishop on Unsplash
