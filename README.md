# Rune Factory 5 / 4SP / 4 Equipment Calculator

<img alt="Like this?" src="./charasprites/rf4/21_SYELZA_body_02_SP2.png" height="600px" align="right">

This is a comprehensive tool for calculating character stats across multiple pieces / combinations of equipment, useful for planning an optimal fusion pathway when forging equipment.

For the hosted version see: [Github Project site](https://lqkhoo.github.io/rf-calculator/).

Supports:
* Rune Factory 5 (Switch) 2020
* Rune Factory 4 Special (Switch, Steam TBA) 2020
* Rune Factory 4 (3DS) 2014

It comes with built-in data tables to filter and sort out the best potential upgrades. Multi-language support is baked in. Currently it is bilingual (English, Japanese).

The forging system in Rune Factory is quite intricate, and different pieces of equipment have different upgrade rules. However, none of the games explain the system in detail, so it's best to fully understand the forging rules first, otherwise the information in the calculator could be overwhelming.

Quick basics check: if you are unfamiliar with rarity bonus tiers / rarity bonus types, how inheritance/overrides work, magic inheritance etc, it's probably best to read up.

The best source of this information is the Japanese wiki:
* Rune Factory 4 ([強化](https://wikiwiki.jp/rf4bu/%E5%BC%B7%E5%8C%96), [ボーナス詳細](https://wikiwiki.jp/rf4bu/%E3%83%9C%E3%83%BC%E3%83%8A%E3%82%B9%E8%A9%B3%E7%B4%B0))
* Rune Factory 5 ([強化](https://wikiwiki.jp/rf5/%E5%BC%B7%E5%8C%96), [ボーナス詳細](https://wikiwiki.jp/rf5/%E3%83%9C%E3%83%BC%E3%83%8A%E3%82%B9%E8%A9%B3%E7%B4%B0))

If language is an issue, you can try machine-translating it. Barring that, there are some posts on GameFaqs' Rune Factory 4 board that may be helpful. Try searching for "override", "inheritance" and "rarity".

This application is built specifically to be offline-capable, so you could just save a copy of the HTML and take it with you. No webserver required.

* If you wish to report a bug, please include the steps to reproduce the bug.
* If you wish to contribute / submit a pull request, please open an issue first, so I can know what it's about and respond appropriately. If it's not a simple bugfix or language fix, let me know the scope of the changes and how long you wish to take. 

# Credits and disclaimer
This project makes use of game assets, included under terms of fair use. This is a personal tool that I polished up for public release, because I think others might also find it useful. The license of this repository applies to the source code, NOT to game assets, which are the legal and intellectual property of the developing company. For library licences, please refer to the source headers.

## Rune Factory 5
* Asset dump by Blazagon.
* Data dump by [Kuroba](https://github.com/KurobaM).
  * This is from v1.0.0 of the JP release. I went through the wiki and fixed a couple of data points in the item table that have been patched (corrected). These are Platinum Shield+, Wind Mantle, Elven Mantle. If you notice anything else let me know.

## Rune Factory 4
* Data dump from the GameFaqs [data mining thread](https://gamefaqs.gamespot.com/boards/258612-rune-factory-4-special/78486979) (Omnigamer). For the version at time of writing, note that the columns for DIZ and STN are swapped.
* Asset dump by myself. Pipeline tools:
   1. ROMFS ([Ryujinx](https://ryujinx.org/)).
   2. BNTX to DDS / ASTC: [BNTX-Extractor](https://github.com/aboood40091/BNTX-Extractor) ([AboodXD](https://github.com/aboood40091)).
   3. DDS to PNG: [Nvidia Texture Tools Exporter](https://developer.nvidia.com/nvidia-texture-tools-exporter).
   4. ASTC to PNG: [astc-encoder](https://github.com/ARM-software/astc-encoder) ([ARM](https://github.com/ARM-software)).
   5. Batch image rotation, crop, padding: [Python](https://www.python.org/), [OpenCV](https://opencv.org/), [Pillow](https://pillow.readthedocs.io/en/stable/).

## Libraries (top-level dependencies)
* Deployment: [Knockout](https://knockoutjs.com/), [Lodash](https://lodash.com/), [Bootstrap](https://getbootstrap.com/), [jQueryUI](https://jqueryui.com/), [Knockout-jQueryUI](https://gvas.github.io/knockout-jqueryui/) (I modified this a bit).
* Development: [npm](https://www.npmjs.com/), [TypeScript (tsc)](https://www.typescriptlang.org/), [Sass](https://sass-lang.com/), [Browserify](https://browserify.org/), [tsify](https://github.com/TypeStrong/tsify), Python 3.4+ required.
* Assets: [Bootstrap Icons](https://icons.getbootstrap.com/) (MIT), [Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif) (CC-BY-SA).
* Formulae on this page generated using [CodeCogs](https://www.codecogs.com/latex/eqneditor.php) as I'm not using MathJax.

# Limitations and known edge cases
Where there's missing data, there's little I can do. This is not the kind of data that could (nor should) be imputed.
* RF5
  * Data tying staff magic to magic IDs is missing, so the planner refers to the original magic that comes with the staff as 'original1', 'original2', etc. Magic from materials is fully modeled.
  * At time of writing, RF5 is not available in English, so some English names are in brackets. These are taken as-is from Kuroba's data dump.
* RF4
  * Magic isn't mapped the same way as in RF5. The data is not available from Omnigamer's data dump, and I couldn't find it in the ROMFS. The Japanese wiki has a short list of materials with known staff upgrade effects, but this list is incomplete. To get around all of this, I backport magic data from ingredients that are both in RF5 and RF4, substituting the itemid as the magicid. Given how little the rest of the data actually changed across the games, this is the most practical option we have.
  * Likewise, charge speed is not exposed as a parameter like the way it is in RF5. I just set the stat to zero for all items.
* Zero columns
  * In both RF5 and RF4, there is nothing that gives DIZ/硬値 (knockback duration) resistance. In fact, that column is not there in the data, but I included it for symmetry. It's not a mistake.
  * Likewise, columns for HP and RP bonuses from equipment and upgrades are new in RF5 but they're always zero, so I exclude them.
* Maybe work on serializing JSON to local storage.
* I'm not a native Japanese speaker. I did my best with the translation, but if you can improve on it, let me know!

## Known differences across game versions
* Stat total in equipment
  * RF5 performs a straight sum of the stats of ingredients in each slot.
  * In RF4 (the 3DS version), the game uses the function `floor(total_stats * -1) * -1`, and it was possible to squeeze in one extra % in resistance from mealy apples / items with negative resistances, in conjunction with ObjectX.
* Weapon element
  * In RF5, elemental crystals directly overwrite element. Big Crystal is the only one that can change to elementless.
  * In RF4, using a crystal of different element first changes element to NONE, and then further use will then apply that element. Crystals of NONE type don't affect element in any way.
* The JP wiki reports that in RF5, certain scales (three of them) don't provide the shield stat bonus. I have no idea whether this is intended or it's just an oversight, but the calculator faithfully reproduces this quirk.
* As far as I know, there are no system (e.g. calculation) differences between Rune Factory 4, and Rune Factory 4 Special.

# For developers
## Building
1. Ensure that you have npm ([Node Package Manager](https://www.npmjs.com/)) installed. You can get it through their website or via Node.js development tools from [Visual Studio](https://visualstudio.microsoft.com/).
2. Git clone this repo to your local directory. Navigate to it, and run `npm install` to install all dependencies, including tsc and sass (the Typescript transpiler and Sass compiler).
3. This project uses browserify to construct a single js file for insertion into the browser. This is because the Typescript is written as modules, and module imports do not work offline without a webserver running on localhost, as browsers do not allow CORS with local files.
4. If you are using [Visual Studio Code](https://code.visualstudio.com/), the build process has been set up via tasks.json, so just hit shift+ctrl+B to build. Otherwise, with your working directory pointed at the root of your local repo, have a look at `tasks.json` and run the shell commands there one by one (or just make a shell script to do that).
5. You will have to do this every time you want the changes in Typescript or Sass to be reflected in js/css.
6. Then just navigate your browser to index.html, or hit F5 from Visual Studio Code. You don't need a local webserver for this project.
7. Python 3.4+ is required to run the script that transforms tsv data into `rf5-rawdata.ts` and `rf4-rawdata.ts`.

## Dev notes
* TSVs mapping weapon element, crystal element, rarity stat type are CASE SENSITIVE. TSVs containing Japanese strings are Shift-JIS-encoded. HTML files are encoded in UTF8 with BOM.
* I use knockout.js because it constructs the computation graph automatically. This project is extremely heavy on bindings (easily in the thousands), so doing this eliminates a major source of bugs.
* Browserify combines javascript files, so some of the libraries have already been combined into our output. Instead of including the source files twice, which can cause issues (knockout especially), we expose the libraries via the window in the top-level source files `*App.ts`, and then include their dependencies after our script. Likewise, our sass file imports Bootstrap's sass file to modify their parameters, so we don't need to include Bootstrap's css in the html head.

# Solver (omitted)
This section is mathematical. It has less to do with the gear calculator than an analysis of Rune Factory's item system, which has remained mostly unchanged over the years.

Originally, I intended to implement a solver for finding an optimum combination of imgredients in slots, given an objective function (in terms of desired stats). RF5's item system turned out to be simple enough to be solved via iterative application of linear programming with very limited branching. Eventually I decided against implementing this, because JavaScript is very poor for robust numerical work; to begin with, it treats all numbers as floats (IEEE 754 double precision) and it doesn't support vectorized operations like Numpy et al does. The procedure is also so easy it could be done by hand. That's what the gear calculator is for.

I'll walk through a sketch of how we can approach this kind of problem, and, in this particular case, solve it with a greedy algorithm. I'll be very verbose as the audience background is potentially quite wide, so if you're already familiar with optimization, please bear with it.

Let all stats (a row in the table) be represented by a real vector:

<img src="https://latex.codecogs.com/svg.latex?\large&space;x&space;=&space;\[x_1,&space;x_2,&space;...,&space;x_n\]" title="\large x = \[x_1, x_2, ..., x_n\]" />

Each material has their own linear combination of stats, so each could be represented as a linear function `f` acting on `x`. The set of materials is finite and countable, so let m enumerate the functions in this discrete function space.

<img src="https://latex.codecogs.com/svg.latex?f_m(x)=a\cdot&space;x=\sum_i^n{a_ix_i}=a_1x_1&plus;a_2x_2&plus;...&plus;a_nx_n" title="f_m(x)=a\cdot x=\sum_i^n{a_ix_i}=a_1x_1+a_2x_2+...+a_nx_n" />

In linear programming, we set `x > 0` to omit the trivial solution. Another point of view is that we are optimizing over the space of `f`, so we could view `x` as the linear scaling coefficient for `a`. We can set `x=1` and optimize over the set of functions `f_m(1)`. Note that `f(1)` for any `m` is just a point in an `n`-dimensional vector space.

Without loss of generality, let's define our objective function to also be linear in terms of `a`, i.e.

<img src="https://latex.codecogs.com/svg.latex?\mathcal{L}(f_m)=g(a_m):=\sum^n_i{k_ia_{m,i}}" title="\mathcal{L}(f)=g(a_m):=\sum^n_i{k_ia_{m,i}}" />

The optimization objective for each iteration (each material slot) is thus:

<img src="https://latex.codecogs.com/svg.latex?argmax_m&space;(\mathcal{L})&space;=&space;argmax_m(\sum^n_ik_ia_{m,i})" title="argmax_m (\mathcal{L}) = argmax_m(\sum^n_ik_ia_{m,i})" />

Let `t` denote the timestep of our algorithm. Over any single piece of gear, our optimization objective is:

<img src="https://latex.codecogs.com/svg.latex?argmax_{({m_{t_1},...,m_{t_\tau}})}&space;\sum^\tau_t&space;g_{m_t}" title="argmax_{({m_{t_1},...,m_{t_\tau}})} \sum^\tau_t g_{m_t}" />

where

<img src="https://latex.codecogs.com/svg.latex?g_1&space;=&space;k\cdot&space;a_{m,1}" title="g_1 = k\cdot a_{m,1}" /> ,

<img src="https://latex.codecogs.com/svg.latex?g_2&space;=&space;k\cdot&space;a_{m_2}(a_{m_1})" title="g_2 = k\cdot a_{m_2}(a_{m_1})" /> ,

<img src="https://latex.codecogs.com/svg.latex?g_t&space;=&space;k\cdot&space;a_{m_t}(a_{m_{t-1}},&space;a_{m_{t-2}},&space;...,&space;a_1)" title="g_t = k\cdot a_{m_t}(a_{m_{t-1}}, a_{m_{t-2}}, ..., a_1)" />


Note that this isn't very nice because the value of `a_t` at time `t` is not a constant, but a function of all `a` that has come before. By extension, this means that `g_t` is a function of every `a` up to that time step. To give an example, if we've used Rune Sphere Shard before, later on, Rune Sphere Shard is worth less due to diminishing returns. This kind of recursively-defined value function is actually very common in games (in the game theory sense), such as chess. For these cases, we could use tree search algorithms, or we could just brute-force every combination if the search space is small. However, none of that is necessary here, because we can show that the optimal algorithm is equivalent to a locally-greedy algorithm:

Observation 1: The effects from upgrades are all monotonic. I'll talk about ObjectX a bit later. Higher rarity / higher level bonus always means either equal or higher stats. Repeated application of the same ingredient either means the same stats (arrange slots) or lower. Ingredients with both positive and negative stat shifts are still monotonic in terms of the defined objective function. Assuming our available resources are unbounded, there's never "too much" of anything. Note that this depends on proper definition of your objective function `g`. I'm aware that resistances cap at 200%, so if you define `g` to weigh those stats at zero, conditional on when they exceed 100% or whatever you like, that's what it's going to do.

Observation 2: There are no set effects (actually there is just one), or mechanics that make it such that, our choice of material in our current upgrade slot can affect the value of what we've chosen before. Since there is just one set bonus, we could trivially brute-force the cases by building a set with / without the bonus and pick the one that's better.

Observation 3: Equivalence in ordering. In this case it's temporal equivalence. It doesn't matter if something comes before something else. There are no chain effects or anything of the sort, so it's not possible to make our future choices any worse! There are diminishing returns, yes, but swapping the ingredients' ordering won't change anything. You can think of item + fold steel as one chunky item that occupies two slots. The reasoning remains the same. This means we don't need to lookahead or faff about with combinatorics.

Observation 4: Diminishing returns change the value of each ingredient each iteration. Otherwise in combination with the first two observations, this won't be much of a game because we could just fill the entire item with the same thing!

Corollaries:

The first three observations mean that it is sufficient for our algorithm to operate on just our CURRENT state. Why? Because all effects are mononotonic, all values of our current state is either always (non-strict monotonically) worse or better than some prior state. It is not necessary to keep that information because we can infer it. To put it more tersely, it is sufficient for our [value function](https://en.wikipedia.org/wiki/Reinforcement_learning#Value_function) to be a function of the current state. We still need to keep track of which slot we're in, but that's about it. Concretely, it means that it is sufficient for us to measure how good the ingredient for a slot is, rather than how good the whole piece is. The function `g` here is our value function.

Observations 2 and 3 mean that our current choice will not affect the value functions of both past and future states. Due to diminishing returns, we can't say that the states are completely independent of each other, BUT regardless of what we do now, the values of our decisions that have come before, and also those that we have yet to make, remain the same.

What's the obvious solution? A greedy algorithm! We can't make our prior actions any worse, and we can't make our future actions any worse either, so what's to prevent us from picking the best current option every single time? Nothing. This is our [optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure). Strictly speaking, we can't make our future actions any worse when we evaluate the equipment piece as a whole.

The diminishing returns we can deal with using an iterative approach, so we can re-evaluate the objective function `g` (the worth of each material) in each time step. We don't need to re-evaluate the value of our state `L`, either present, past, or future.

Let's deal with ObjectX first. There are only 3 practical cases to consider.
* First case, include ObjectX at the end so we don't have to reverse its effects again.
* Second case, include it as early as we need to, and then reverse it the moment when we don't need it anymore.
* We don't use ObjectX at all.

In any situation where we are under ObjectX's effect, we simply reverse the value of `a`. Nothing else changes whatsoever. We just evaluate all three cases and pick the best one.

That's objectX dealt with. Now the only remaining multi-slot effects to deal with are the cores, and fold steel. Fold steel could be handled greedily. Just use it as early as possible, because we are using our best ingredients as early as possible. For the cores, if we want to use them, put them all in the last 4 slots we consider, unless of course we've already used a core before, in which case we'll omit the ones we've already used.

That's it! We've simplified the problem. Via the above reasoning, handling cores and other knicknacks separately via branching, we can reach the same optimum by using the following (much simplier) optimization objective:

<img src="https://latex.codecogs.com/svg.latex?argmax_{({m*_{t_1},...,m*_{t_\tau}})}&space;\sum^\tau_t&space;g(a_{m*_t})=\sum^\tau_t&space;\sum^n_ik_ia_{m*_t,i}" title="argmax_{({m*_{t_1},...,m*_{t_\tau}})} \sum^\tau_t g(a_{m*_t})=\sum^\tau_t \sum^n_ik_ia_{m*_t,i}" />

where `m*` is the choice that maximizes `g` in the same time step. In other words, the greedy choice.

You might be wondering how we could optimize the entire character, since we've only been talking about a single piece of gear. This is easily done by tracking the states of all 6 pieces of equipment at once, i.e. instead of building one piece after the other, we consider the first slots of all the pieces, then all the second slots, and so on. Strictly speaking, we consider actions across all 6 pieces. Most actions correspond to filling one slot, but some others, e.g. fold steel, fill multiple slots at once. Of course the value of such an action is normalized across the number of slots it's taking.

Obviously there are going to be complications such as ObjectX. Suppose we are optimizing for elemental resistance, what a naive algorithm is going to start off by putting ObjectX in every single item, followed by a mealy apple. In practice, we can head off the algorithm by starting off 3 pieces with ObjectX -> 4x mealy applie -> ObjectX, which is what the optimum is anyway. If we want to do this completely programmatically, the straightforward thing to do is to expand our action space, for example, one ObjectX + any one item. ObjectX + two of the same items, and so on, and evaluate the value function over those slots together and normalize by number of slots. This is doing lookahead for objectX. The algorithm would arrive at the same conclusion.