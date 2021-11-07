# Contributing

This is a community project that is trying to collect great GameMaker Studio projects for discoverability. That only works if people add the projects they know about!

This repo is set up to automate everything except for adding new projects. You can add/edit files right in GitHub, or you can fork this repo to make your own copy. In any case, submit a Pull Request with your changes when you're ready.

You can compile your changes to make sure now errors get thrown, by running `npm run compile` with Node v14+.

## Add or edit a library

Open up [`./libraries.json`](./libraries.json), then add a new library or find and edit an existing one.

Libraries are documented in JSON format; you can look at neighboring library data to see what that looks like. There are optional fields that you can add that you might not see in other library's JSON info.

If you use VS Code to edit, you'll get auto-completion support when adding and editing data to the JSON file!

## Add a new tag

Tags are for categorizing libraries so that they can be more easily search, filtered, and sorted.

Open up [`./tags.txt`](./tags.txt) and plop your new tag right at the end of the file.

Note that tags will be forced to kebab-case to ensure consistency, and any tag you add should also be put on at least two libraries in the [`./libraries.json`](./libraries.json) file via the `tags` field.

## Validating library data and adding new fields

To ensure that the library data is consistent, the format is dictated by the [JSON Schema](https://json-schema.org/) file [`./utility/libraries-schema.json`](./utility/libraries-schema.json). That file is the source of truth for the library data, and is used to validate the `libraries.json` file as well as to generate Typescript types to make it easier to write code to manage this project.

If you want to make new fields available to library data, you'll need to update the Schema. If you make edits in VSCode you'll get some IDE support for possible fields. Otherwise the current Schema contains examples of the kinds of things you'd likely want to do, so you won't need to become a JSON Schema expert to update it.

Once you've added fields to the Schema, you'll be able to run `npm run compile` to make sure that your Schema changes are valid and that all of the existing library data still matches.

## Using VSCode

To get the most assistance with editing this project, either to edit library info or to change the scripts, you can use [VSCode](https://code.visualstudio.com/). This project provides recommended VSCode extensions to make things as smooth as possible.

You don't even need to install VSCode to use it, GitHub lets you open up a GitHub project in VSCode right inside your browser! To do so, navigate to the project's GitHub page and hit the `.` key.

Once you've got the project open in VSCode, run `npm install` in the VSCode terminal to install all of the dependencies. Then you can run `npm run compile` whenever you want to test your changes and see how they affect the project. Note that you won't *need* to compile your changes, since this will be done for you by GitHub.