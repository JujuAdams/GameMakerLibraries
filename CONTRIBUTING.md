# Contributing

This is a community project that is trying to collect great GameMaker Studio projects for discoverability. That only works if people add the projects they know about!

This repo is set up to automate everything except for adding new projects. You can add/edit files right in GitHub, or you can fork this repo to make your own copy. In any case, submit a Pull Request with your changes when you're ready.

You can compile your changes to make sure now errors get thrown, by running `npm compile` with Node v14+.

## Add a new library

Open up `./libraries.yaml` and plug your new library right in!

Libraries are documented in YAML format, but you can look at neighboring library data to see what that looks like. There are optional fields that you can add that you might not see in other library's YAML info. To find these, use an IDE like VSCode to get hints and auto-completion.

## Add a new tag

Tags are for categorizing libraries so that they can be more easily search, filtered, and sorted.

Open up `./tags.txt` and plop your new tag right at the end of the file.

Note that tags will be forced to kebab-case to ensure consistency, and any tag you add should also be put on at least two libraries in the `./libraries.yaml` file via the `tags` field.

## Using VSCode

To get the most assistance with editing this project, either to add libraries or to change the scripts, you can use [VSCode](https://code.visualstudio.com/). This project provides recommended VSCode extensions to make things as smooth as possible.

You don't even need to install VSCode to use it, GitHub lets you open up a GitHub project in VSCode right inside your browser! To do so, navigate to the project's GitHub page and hit the `.` key.

Once you've got the project open in VSCode, run `npm install` in the VSCode terminal to install all of the dependencies. Then you can run `npm compile` whenever you want to test your changes and see how they affect the project. Note that you won't *need* to compile your changes, since this will be done for you by GitHub.