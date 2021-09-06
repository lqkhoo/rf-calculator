# Building

1. Ensure that you have the Typescript transpiler (tsc) installed. If it is, the following should not error in bash/cmd/PowerShell: `tsc --version`
    * Otherwise you can install it via npm i.e. [Node Package manager](https://www.npmjs.com/), via the command `npm install -g typescript`.
    * If you don't have npm, get it from their website, or if you already have [Microsoft Visual Studio](https://visualstudio.microsoft.com/), installing the Node.js development tools would also install npm.

2. Then nagivate to your workspace directory i.e. your local clone of this repo that contains tsconfig.json.
    * Run the command `tsc`.
    * Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/), just hit F5.

3. Python 3.4+ is required to run the scripts that parse the tsv data into json.





# Edge cases