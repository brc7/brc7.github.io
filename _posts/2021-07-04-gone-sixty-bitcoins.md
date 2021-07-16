---
title: "Gone in 60 Seconds: The Energy Cost of a Bitcoin"
author: Ben Coleman
layout: post
background: '/assets/img/2021-07-04-background.jpg'
---

Everyone knows that cryptocurrency is expensive, and not just from an investment perspective.
The blockchain network uses a *massive* amount of electricity, so much that the environmental side-effects have recently come under public scrutiny.
This is part of the reason why Tesla reversed their decision to accept Bitcoin in May 2021, mere months after establishing the policy in March.
Estimates abound for the true sustainability cost of cryptocurrency, but most researchers agree that it's expensive.
Cambridge has a [real-time index](https://cbeci.org) that estimates the annual energy cost of Bitcoin at about 60 terawatt-hours (TWh) per year.[^1] But how much is that, really?

Most people find it hard to relate to terawatt-scale measurements. It's also hard to mentally contextualize the cost when it's distributed over an entire year. So we're going to look at a much smaller unit of energy and time - just enough to mine one Bitcoin. 

You might've "bought the dip," but what did it cost to *mine* your Bitcoin?

## One Bitcoin of Energy

I estimate that the energy required to mine one Bitcoin is about 180 MWh. See the end of the post for details. Since one Bitcoin is mined every minute or two, you can think of this energy as being (approximately) consumed every minute.[^2]

With 180 MWh of energy, you could:

- Power your home for 17 years
- Power all of New York City for 1.8 minutes
- Completely vaporize a competition swimming pool
- Fully charge every Tesla in San Francisco
- Run the International Space Station for nearly 3 months
- Train the GPT-3 neural language model
- Make 72 million Krispy Kreme donuts
- Inflate three flailing balloon tube men for every car dealership in America, for the full duration of a new car sales pitch
- Light 4 million Christmas trees for an hour
- Recharge your iPhone battery 17 million times
- Desalinate 24 million gallons of seawater into fresh water (about 36 Olympic-sized swimming pools)
- Fire the US Navy's experimental railgun 20,000 times
- Drive your Tesla from San Francsico to New York City and back, *101 times*
- Erect a 32-story limestone pyramid
- Start a category 2 tornado
- Lift the Eiffel Tower 4.5 miles into the air
- Slice 390 steel shipping containers into fingernail-sized pieces with a plasma beam
- Drag 33 container ships out of the Suez Canal
- Win a tug-of-war game with 99 million NFL linebackers

In order to generate 180 MWh, you would need to:
- Burn 90 metric tons of coal
- Burn 14.5 thousand gallons of a liquid petroleum fuel such as gasoline
- Run a wind turbine at maximum speed for 5 days
- Harness the power of 2,400 lightning bolts
- Detonate 160 metric tons of TNT (about 350,000 pounds)
- Cycle the equivalent of the Tour de France, seven thousand times
- Run 13.7 million miles on a treadmill. That's enough to circumnavigate the globe 548 times!
- Harvest the energy output from 2 sextillion mitochondria (metabolic equivalent of approximately 84 million people, or the population of Germany)
- Harvest the power of 500 billion heartbeats


## Conclusion

Bitcoin is expensive. Really expensive.

When you hear statements comparing the power demands of Bitcoin to countries like Sweden, it's hard to fully internalize what this means. It's a lot easier to understand that 1 BTC equals 90 tons of coal or 17 years of electric bills, and that 1 BTC is mined every minute or two.


### Is it worth it?

Is Bitcoin worth the tremendous energy cost? I'm not sure. Decentralized digital currencies have attractive properties related to privacy, portability and trust. Proponents of cryptocurrency argue that these properties could decouple the currency from government and other centralized institutions, improve transaction convenience and ultimately change the financial landscape. There are compelling arguments for non-state money, and there are mitigating factors for the electricity demand. 

Because Bitcoin can be mined at any time of day from anywhere on earth, the blockchain can be sustained by excess power generated during non-peak hours by hydrodynamic plants, solar farms and wind turbines. If Bitcoin only consumes sustainable energy that would otherwise be wasted,[^3] does it even matter how much energy it uses?

I think it does, because cryptocurrency is not the only way to smooth out power demand. The "excess energy" argument applies to other computational tasks, such as training machine learning models or running physics simulations. Are these tasks more important than decentralized money? It's hard to say - depends who you ask. Cryptocurrency must also compete with conventional methods to export unused energy, such as aluminum production. While the brick-and-mortar financial industry does consume prodigious amounts of energy, Bitcoin manages an order of magnitude fewer transactions at a much higher unit cost. 

### The Path Forward

Cryptocurrency has a lot to offer, but it is by no means a mature technology. It's possible that dwindling block rewards will encourage lower energy consumption or that the Bitcoin network will switch from Proof-of-Work to an alternative protocol that is less demanding, such as Proof-of-Stake. Even today, there is nothing to preclude the deployment of efficient payment networks built on top of the Bitcoin blockchain. But it's likely that the future will belong to a generation of cleverly-designed protocols that combine the best features of Bitcoin with as-yet undiscovered algorithms.[^4] If there is anything to learn from the Bitcoin energy debate, it's that this innovation process must include energy consumption as a key design factor.

## Methodology and Math

I've tried to make the estimates as reasonable as possible, but the calculations are approximate (largely because researchers can only approximate the energy consumed by the Bitcoin network). First, we need to find the average energy cost of mining a *single* Bitcoin.

The easiest way to estimate this value is to take the annual energy expenditure of Bitcoin mining and divide it by the number of Bitcoins produced each year. Since 6.25 Bitcoins are produced every 10 minutes, there are 328500 new Bitcoins each year. The network consumes about 60 TWh per year, so the average cost of one Bitcoin is 182 MWh.

$$ \frac{60 \text{ TWh}}{1 \text{ year}} \frac{1 \text{ year}}{328500\text{ BTC}} = \frac{182 \text{ MWh}}{\text{BTC}}$$

## Estimating the Bitcoin-Equivalent Energy Cost

In this section, I'll explain exactly how I computed the Bitcoin-equivalent amounts listed earlier. Put simply, I find the amount of energy involved with a particular task and compare that to the 182 MWh used to generate a Bitcoin. For electrical quantities (such as powering New York City), this strategy provides a very good idea of the cost. For other quantities (such as building a massive pyramid or unleashing a tornado), our values are more approximate since we assume a perfectly efficient conversion from electrical energy to mechanical, thermal or chemical energy.

### Power, Energy, Force and Work

Before we continue, let's review some basic physics. Energy represents our ability to do work and is measured in watt-hours (electrodynamics), Joules (mechanics), or calories (thermodynamics). Power represents the rate at which energy is produced or consumed and is measured in watts. You may think of energy as the battery charge on your phone and power as the rate at which you are draining the battery. When making a call or using location services, the battery (energy) drains faster because the consumption rate (power demand) is larger.

$$ \text{Energy} = \text{Power}\times\text{Time} $$

An electrical load - such as a home, lightbulb or Bitcoin mining computer - is powered by applying a voltage to the device. This voltage forces electrons through the device's circuit which, on their journey from high to low voltage, do useful work.

$$ P \text{ (Watts) } = I \text{ (Amps) } \times V \text{ (Volts) }$$

To find the power consumption of an electrical device, we can usually just multiply the voltage and current ratings provided by the manufacturer. For example, my iPhone charger is rated for 5 volts and 1 amp, so it can output up to 5 watts of power. If I use the charger at full power for an hour, I've used 5 watt-hours of energy.

Mechanical energy describes energy stored by nature of the motion or position of an object. In order to change an object's motion or position, we must apply a *force*. Newton's Second Law describes the strength of the force needed to accelerate an object of mass $$m$$ (kilograms) by a rate $$a$$ (meters per second squared).

$$ F \text{ (Newton) } = m a  $$

If we apply a constant force to an object as it moves, we perform *work* on the object. Work is a measure of how much energy we have transferred to the object and is the product of force and distance.

$$ W \text{ (Joules) } = F d$$

Energy and work are related because the mechanical energy of an object increases by the amount of work done to the object. For this reason, work and energy have the same units (Joules). The potential energy of an object is the amount of work that can be done by dropping the object. This corresponds to the product of the force due to gravity with the height of the object above ground.

$$ U \text{ (Joules) } = F_{\mathrm{grav}} h = mgh$$

The kinetic energy of an object is the amount of work needed to accelerate the object from rest to a velocity $$v$$ (in meters per second). This can be derived using basic calculus.

$$ K \text{ (Joules) } = \frac{1}{2} mv^2 $$

And that's it! We'll use the laws of calorimetry for one of the claims, but the majority of our discussion follows directly from these equations.

**Disclaimer:** Electrical engineers will politely point out that I am ignoring a lot of mathematical details, especially those pertaining to the difference between AC and DC circuits. Mechanical engineers will lament my simplistic description of classical mechanics. Physicists will send strongly-worded letters to my residential address demanding the addition of calculus to this post. Fortunately, a basic understanding is enough to approximate the power and energy used by Bitcoin.

### The Explanations

**Vaporize a Swimming Pool:** Using the laws of calorimetry, we can [calculate the energy required to boil a specific volume of water](https://chemistry.stackexchange.com/questions/27310/amount-of-energy-needed-for-boiling-a-litre-of-water). The resulting formula can be inverted to calculate the volume of water that can be boiled using a specific amount of energy. If we assume that the water starts at room temperature (20 Celsius), then 182 MWh is enough to boil 252,600 litres of water. This is the capacity of a [2-lane competition swimming pool](https://www.usaswimming.org/docs/default-source/clubsdocuments/facilities/pool-certifications/pool-dimensions-and-reccomendations.pdf) that is 25 meters long.

**Christmas Trees:** We assume that each Christmas tree needs 500 lights, and that (as an environmentally-conscious consumer) you use LED lights. Using [a typical LED power estimate of 70 watts per 1000 lights](https://www.christmaslightsetc.com/pages/how-many-watts-amps-do-christmas-lights-use.htm), we obtain 45 watts per Christmas tree. One Bitcoin's worth of energy can power four million 45-watt trees for an hour.

**Power NYC:** According to the [New York Building Congress](https://www.buildingcongress.com/advocacy-and-reports/reports-and-analysis/Electricity-Outlook-2017-Powering-New-York-Citys-Future/The-Electricity-Outlook-to-2027.html), New York City used 52.5 TWh in 2016, which corresponds to 99.9 MWh per minute. The 182 MWh needed to mine a Bitcoin can sustain this demand for 1.8 minutes.

**Tesla Trips:** According to the [US Department of Energy](https://www.fueleconomy.gov/feg/bymodel/2021_Tesla_Model_S.shtml), the Tesla model S can travel 100 miles on a 31 kWh charge. With 182 MWh, we can drive a Tesla model S for 587,000 miles. The one-way driving distance from NYC to SF is about 2,900 miles, so 182 MWh can power 101 round trips.

**Tesla Batteries:** The latest Tesla models have [a battery capacity of 100 kWh](https://en.wikipedia.org/wiki/Tesla_Model_S), so we can fully charge 1,820 Teslas with the energy required to mine a Bitcoin. Registration records from the California Department of Motor Vehicles indicate that there were [about 1,800 Teslas in San Francisco in 2018](https://www.bizjournals.com/sanfrancisco/news/2018/05/25/bay-area-cities-most-tesla-vehicles.html
). There are likely more than 1,800 Teslas in 2021, but we also consider a comparatively low value for the annual energy demand of Bitcoin. It is quite possible that the true cost to mine a Bitcoin is large enough to charge the extra Teslas.


**Donuts:** This turned out to be interesting, since there are many different kinds of donut machines. Krispy Kreme, Dunkin Donuts, and several other donut companies buy machines from Belshaw Adamatic. The Mark V Belshaw Adamantic donut machine draws between 6.9 and 9.0 kW of power and can produce 226 dozen donuts per hour, according to [the datasheet](https://www.belshaw-adamatic.com/catalog/retail-equipment/donut-machines---donut-robotreg/donut-robot-mark-v-gp-automated-mini-donut-maker-capacity-226-dozenhour-electric). Assuming an average power consumption of 7 kW, one Bitcoin's worth of energy will power the machine for 26,000 hours (about 3 years). That's 5.9 million boxes of donuts, or 72 million individual donuts!


**iPhone Battery:** The iPhone 12 has a 2815 mAh battery and runs at 3.7 volts. This corresponds to a fully-charged energy capacity of 10.4 watt-hours, which can be replenished 17.5 million times from an energy reserve of 182 MWh.

**Car Dealerships:** According to the J.D. Power 2017 U.S. Sales Satisfaction Index, American car buyers spend an average of 3.6 hours at the dealership. Car dealerships use air pumps to inflate their flailing balloon men, to attract attention from motorists. According to the pump information and Amazon reviews for the LookOurWay model, the blower draws about 1 kW. If we must keep the balloons inflated for the entire sales pitch, we can inflate 50 thousand of them. Since there are about [16,708 car dealerships in America](https://www.carprousa.com/blog/car-dealerships-behind-the-numbers), that's three tube men for each dealership. 

**American Households:** The average American household used [877 kWh per month in 2019](https://www.eia.gov/tools/faqs/faq.php?id=97&t=3). This translates to 10.5 MWh per year. An energy reserve of 182 MWh can provide 17.2 years of service.

**Space Station:** The ISS uses between 75 and 90 kW of instantaneous power. Assuming peak usage, one Bitcoin's worth of energy could run the ISS for about 2 thousand hours, or 2.7 months.

**Railguns:** One of the US Navy railgun prototypes requires [about 32 MJ per shot](https://en.wikipedia.org/wiki/Railgun). This is equivalent to 8.88 kWh. Of course, the main practical difficulty with a railgun is not the absolute energy requirement but rather the fact that the energy must be delivered to the projectile in less than a second. Ignoring this (substantial) engineering problem, 180 MWh is enough to fire the gun 20,000 times.

**Eiffel Tower:** The mass of the Eiffel Tower is [about 9.1 million kilograms](https://www.toureiffel.paris/en/the-monument/key-figures). For simplicity, we neglect air resistance and assume that all 182 MWh are converted into gravitational potential energy with no loss. Using the formula for gravitational potential energy, we find that an object as massive as the Eiffel Tower must be 7337 meters, or about 4.5 miles above the surface of the earth to have 182 MWh of potential energy. 

**Plasma Cutters:** Shipping containers are built from 14 gauge corrugated steel (about 0.075 inches or 2 mm thick) and measure 20 feet by 8 feet by 8.6 feet. A typical plasma cutter draws 30 amps at 120 volts (3.6 kW) and can [cut through 14 gauge steel at approximately 60 inches per second](https://www.plasma-automation.com/partsdatabase/CuttingCharts/hpr260.pdf). With 182 MWh of energy, we can cut through steel for about 50 thousand hours. At 60 inches per second, we can cut through 15.17 million feet of steel.

How many feet of cuts do we need to make to cut a box of dimensions $$ l \times w \times h$$ into 0.5 inch squares? There are six sides of the box: two $$l \times w$$ squares, two $$w\times h$$ squares, and two $$l \times h$$ squares. To find the number of cuts for each side, we can divide the side length by 0.5 inches. To find the length of the cut, we multiply by the length of the other side. The total length of the cuts needed to divide the box into squares of side length $$s$$ is as follows.

$$ 4\left(\frac{lw}{s} + \frac{wh}{s} + \frac{lh}{s}\right)$$

Plugging in the dimensions of a shipping container, we find that each box requires 38,860 feet of cutting to divide it into half inch squares. Since we can cut a total length of 15.17 million feet, we can do 390 boxes.

**Container Ships:** This is a very rough approximation, but an interesting one. The Ever Given container ship weighed about 200,000 metric tons, was 400 meters long, and required 14 tug boats to re-orient itself in the Suez Canal. We will approximate the amount of work done on the ship by the tugs and relate this to the Bitcoin-equivalent energy.

If we assume that half of the tugs are placed at one end of the ship and the other half are at the opposite end, then the container ship is a rotational system that pivots around the center of the ship. We'll suppose that the ship must be rotated by 45 degrees, or $$\pi / 4$$ radians. With this in mind, the work exerted by the tugs on the ship is 

$$ W = \tau \theta = \frac{\pi}{4} 200 F_T$$

where $$F_T$$ is the force exerted by a tug boat. Modern tug boats can provide between 2-70 kiloNewtons of force. To lower bound the number of containers ships that we can rotate with 182 MWh, we'll assume that each tug provides 70 kN. With this in mind, we need about 10.99 MJ to rotate the ship, meaning that we can rotate 33 ships with 182 MWh (about 655 GJ).

**Training GPT-3:** There are a variety of estimates for the training cost of GPT-3, some of which are much higher than 182 MWh. I do not currently work for OpenAI, so I do not know the true cost. A [recent research paper](https://arxiv.org/abs/2007.03051) estimates that GPT-3 requires about 189 MWh of electrical energy to train. It's hard to say whether this is accurate, but the estimate seems reputable because the method was able to predict the energy used by smaller models within 10% error.

**Desalinate Water:** Desalination efficiency depends on [several factors](https://en.wikipedia.org/wiki/Desalination#Energy_consumption), including the salt content of the water and the type of desalination process. [Argyris Panagopoulos (Energy, 2020)](https://www.sciencedirect.com/science/article/abs/pii/S0360544220318405
) estimates that 1 kWh is the minimum energy required to desalinate a cubic meter of seawater. However, practical desalination plants seem to require about 2 kWh per cubic meter of water, excluding the energy used for pre-filtering and water intake. One cubic meter is a thousand litres or 264 gallons, so 182 MWh can desalinate about 24 million gallons of seawater. An Olympic swimming pool contains 2.5 million litres, so we can desalinate 36.4 pools.

**The Pyramid:** To estimate the size of the pyramid, we will use the same approximation method used by a [recent article in the IEEE Spectrum magazine](https://spectrum.ieee.org/tech-history/heroic-failures/how-many-people-did-it-take-to-build-the-great-pyramid). The volume of a rectangular pyramid of height $$h$$ with an $$l \times w$$ rectangular base is

$$\mathrm{vol} = \frac{lwh}{3}$$

The center of mass of the pyramid is one quarter of its height. We will suppose that the base is a perfect square and that the ratio of the base to the height is the same for our pyramid as for the Great Pyramid at Giza. That is

$$l = w = \frac{230}{147}h $$

Assuming that the density of the pyramid is 2.5 metric tons per cubic meter and using 9.81 as the acceleration due to gravity, we wish to find the height that makes the potential energy of the pyramid equal to 182 MWh.

$$ 5003 h^4 = 182\text{ MWh}$$

This value turns out to be 107 meters, or approximately 32 stories (the height of a small skyscraper).


**Tug of War:** In a regulation tug-of-war game, the objective is to move the opposing team a distance of 13 feet in a time limit of 15 minutes. A [2011 paper in the International Journal of Sport and Exercise Science](http://web.nchu.edu.tw/~biosimulation/journal/pdf/vol-3-no01/vol-3-no-1-b-0003.pdf) measured the average force exerted by a tug-of-war team member to be 1.5 times their bodyweight. We will assume that we have N linebackers attached to a motor powered by the energy equivalent of a Bitcoin. For simplicity, we assume a massless rope with infinite tensile strength. We will calculate the amount of work needed to drag the NFL players 13 feet in 15 minutes to win the game. The force exerted by the football team is

$$ F_N = 1.5 g m N$$

where $$g = 9.81$$ is the acceleration due to gravity and $$m$$ is the mass of a linebacker ([about 113 kg or 250 lbs](https://webpages.uidaho.edu/~renaes/251/HON/Student%20PPTs/Avg%20NFL%20ht%20wt.pdf)). The Bitcoin-equivalent engine must output a force $$F_B$$ that can overcome $$F_N$$ by enough to move the players 13 feet in 15 minutes. 

$$F_B = F_N + F_E$$

where $$F_E$$ is the extra force that must be applied to exert a net force on the players. We can calculate $$F_E$$ using the kinematic equations and Newton's Second Law. 

$$ \Delta_x = v_0 t + \frac{1}{2}a_E t^2$$

$$ F_E = 2 m N \frac{\Delta_x}{t^2}$$

The total work exerted by the Bitcoin-motor is $$W_B = F_B \Delta_x$$, allowing us to calculate the maximum number of players. 

$$ W = 1.5gmN \Delta_x + 2 mN \frac{\Delta_x^2}{t^2}$$

$$ N = \frac{W t^2}{1.5gm t^2 \Delta_x + 2 m \Delta_x^2}$$

Plugging in the values (in the correct units), we get N = 99 million. This *far* exceeds the number of NFL players, which is capped at 1,696 players. The force exerted by 99 million people also [exceeds the tensile strength of the strongest materials known to man](https://what-if.xkcd.com/127/), so it would be impossible to actually play such a tug-of-war game. 


**Treadmills:** The [Eco-Power G690 treadmill](https://www.gosportsart.com/wp-content/uploads/documentation/G690_Sell_ENG.pdf) generates 200 watts when used at the maximum speed setting of 15 miles per hour. To generate 182 MWh, we need to run the treadmill for 910,000 hours, during which time the user will have run 13.65 million miles. This is about 548 times the circumference of the earth.

**Mitochondria:** The mitochondria are the powerhouse of the cell, but not the powerhouse of the blockchain. According to a [study of mitochondria in lab rat liver tissue](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=107137&ver=3), each mitochondrion can produce approximately 70.5 attomoles of ATP per second. ATP hydrolysis releases [about 47 kJ/mol](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=101701&ver=14&trm=101701&org=), meaning that we would need to convert about 13.9 million moles of ATP to ADP to produce enough energy to mine a Bitcoin. 

We wish to find the number of mitochondria needed to generate this much ATP in 1.6 minutes (the time during which a single Bitcoin is mined). Over the course of 1.6 minutes, each mitochondrion can generate 6.77 femtomoles of ATP, meaning that we need about 2 sextillion (2.06e+21) mitochondria. It is difficult to estimate the number of mitochondria For technical reasons, mitochondria are most well-studied in the context of human liver cells, which [contain 1000-2000 mitochondria per cell](https://bscb.org/learning-resources/softcell-e-learning/mitochondrion-much-more-than-an-energy-converter/). Unfortunately, mitochondria populations are not currently known for other cell types, making it difficult to estimate the number of mitochondira in an adult human. 

However, we can estimate the human-power equivalent of a Bitcoin by considering the amount of energy produced to maintain homeostasis. The average human energy production rate [is about 80 watts](https://en.wikipedia.org/wiki/Human_power). Therefore, it would take 84 million people to generate 182 MWh over the same 1.6 minute time period. This is close to the population of Germany, which [83.1 million people](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population).

**Heartbeats:** The power output of the human heart is approximately [1.3 watts with an average resting heart rate of 60 beats per minute](https://hypertextbook.com/facts/2003/IradaMuslumova.shtml). Thus, one heartbeat produces 0.36 mWh of energy and a Bitcoin is equivalent to 500 billion heartbeats.

**Tornados:** 182 MWh is equivalent to 655.2 gigajoules (GJ). A [recent study of the kinetic energy of tornados](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4489157/) claims that the strongest quarter of tornadoes have kinetic energy exceeding 383 GJ. Several of the EF2 tornadoes listed in the paper have energy comparable to that required to mine a Bitcoin. 

**Lightning Bolts:** According to the [National Weather Service](https://www.weather.gov/safety/lightning-power), a typical lightning bolt provides a current of 30 kiloamperes at a voltage of 300 million volts for 30 microseconds. This corresponds to a power generation capacity of 9 terawatts for 30 microseconds, or 75 kWh. Thus, we can unleash 2,400 lightning bolts with one Bitcoin.

**Bicycles:** The 198 cyclists in the Tour de France [each individually generate about 25.8 kWh](https://www.exercisebike.net/power-of-the-tour-de-france/). To generate 182 MWh, we would require about 7,000 individual trips.

**Wind Turbines:** According to experiments performed by the National Renewable Energy Laboratory, the General Electric 1.5-MW turbine model produces [1500 kW when the wind speed exceeds 24 mph](https://www.nrel.gov/docs/fy15osti/63684.pdf). At this generation rate, it would require the turbine 121 hours (5 days) to produce enough energy to mine a Bitcoin. It is important to remember that most wind farms do not operate at full capacity all of the time. Under an [optimistic capacity factor of 0.52](http://css.umich.edu/factsheets/wind-energy-factsheet), the turbine will require 9.7 days to produce the energy.


## Notes

[^1]: At the time of writing, the estimated cost was 62.7 TWh per year, with theoretical upper and lower bounds of 22.5 TWh and 150.9 TWh.
[^2]: On average, 6.25 Bitcoins are mined every 10 minutes, which translates to one Bitcoin every 1-2 minutes.
[^3]: This is a very, *very* optimistic assumption.
[^4]: Perhaps it is reasonable to use an interleaved combination of PoW and PoS blocks or combine the methods in other ways. For example, a PoS protocol could sample a group of nodes to validate a block and use a low-difficulty PoW protocol internally within the group. We may also find ways to tie the security of the blockchain to another finite resource, other than electricity (for PoW) or currency stake (for PoS). 


[Photo Credit] Zane Lee on Unsplash
