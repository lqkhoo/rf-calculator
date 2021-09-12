# Building
1. Ensure that you have npm ([Node Package Manager](https://www.npmjs.com/)) installed. You can get it through their website or via Node.js development tools from [Visual Studio](https://visualstudio.microsoft.com/).
2. Git clone this repo to your local directory. Navigate to it, and run `npm install` to install all dependencies, including tsc and sass (the Typescript transpiler and Sass compiler).
3. This project uses browserify to construct a single js file for insertion into the browser. This is because the Typescript is written as modules, and module imports do not work offline without a webserver running on localhost, as browsers do not allow CORS with local files.
4. If you are using [Visual Studio Code](https://code.visualstudio.com/), the build process has been set up via tasks.json, so just hit shift+ctrl+B to build. Otherwise, with your working directory pointed at the root of your local repo, run the following commamnds in your shell:
```
browserify ts/App.ts -p [ tsify --noImplicitAny ] > js/rf5planner.js
sass css/rf5planner.scss css/rf5planner.css
```
5. You will have to do this every time you want the changes in Typescript or Sass to be reflected in js/css. The first build command is from [tsify](https://github.com/TypeStrong/tsify).
6. Then just navigate your browser to index.html, or hit F5 from Visual Studio Code.
7. Python 3.4+ is required to run the script that transforms tsv data into DATA.ts.

# Dev notes
We use knockout.js because it constructs the computation graph automatically. This project is extremely heavy on bindings (easily in the thousands), so doing this eliminates a major source of bugs.

Browserify combines javascript files, so some of the libraries have already been combined into our output. Instead of including the source files twice, which can cause issues (knockout especially), we expose the libraries via the window in App.ts, and then include their dependencies after our script.

Likewise, our sass file imports Bootstrap's sass file to modify their parameters, so we don't need to include Bootstrap's css in the html head.

# Credits
Art assets are from Blazagon's data dump, who is part of Reddit's RF5 reverse-engineering group.

# Disclaimer
All art assets are originals from the game, and are thus copyrighted material owned by the publisher. They have been included in this project under fair use. It goes without saying that the MIT license for this repository only extends as far as the source code, not to those assets.

# Implemented against the following known edge cases:
## Version
* v1.0.10 JP.
## Fold steel
* Fold steel only works in upgrade slots: https://wikiwiki.jp/rf5/%E5%BC%B7%E5%8C%96#m32ff6ed
* Only one is effective for each item. Those in non-upgrade slots don't count towards the limit.
## Light ore
* Light ore allows cross-weapon override.
* Light ore does not prevent same-class override.
## ObjectX
* ObjectX effect ignored by fold steel.
* ObjectX effect carried over from arrange slots.

## Arrange slots
* Are not subject to diminishing returns.
* Item levels in arrange slots do not count towards total. Rarity does.

## Recipe slots
* Does not apply item upgrade stats.
* Does apply base item stats for base item / first valid override.