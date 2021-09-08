# Building
1. Ensure that you have npm ([Node Package Manager](https://www.npmjs.com/)) installed. You can get it through their website or via Node.js development tools from [Visual Studio](https://visualstudio.microsoft.com/).
2. Git clone this repo to your local directory. Navigate to it, and run `npm install` to install all dependencies, including tsc and sass (the Typescript transpiler and Sass compiler).
3. This project uses browserify to construct a single js file for insertion into the browser. This is because the Typescript is written as modules, and module imports do not work offline without a webserver running on localhost, as browsers do not allow CORS with local files.
4. If you are using [Visual Studio Code](https://code.visualstudio.com/), the build process has been set up via tasks.json, so just hit shift+ctrl+B to build. Otherwise, with your working directory pointed at the root of your local repo, run the following commamnds one by one in your shell:
```
browserify ts/App.ts -p [ tsify --noImplicitAny ] > js/rf5planner.js
sass css/rf5planner.scss css/rf5planner.css
```
5. You will have to do this every time you want the changes in Typescript or Sass to be reflected in js/css. The first build command is from [tsify](https://github.com/TypeStrong/tsify).
6. Then just navigate your browser to index.html, or hit F5 from Visual Studio Code.
7. Python 3.4+ is required to run the script that transforms tsv data into DATA.ts.

# Credits
Art assets are from Blazagon's data dump.

# Disclaimer
All art assets are originals from the game, and are thus copyrighted material owned by the publisher. They have been included in this project under fair use. It goes without saying that the MIT license for this repository only extends as far as the source code, not to those assets.