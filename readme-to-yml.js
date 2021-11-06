const fs = require('fs');
const yaml = require('yaml');

const YAML_OUT_PATH = 'libraries.yaml';

const readme = fs.readFileSync('./README.md', 'utf-8');

const linkPattern = /^\[(?<title>[^\]]+?)\]\((?<url>[^\)]+?)\)/;

const linkMatches =
  /** @type {RegExpMatchArray} */
  (readme.match(new RegExp(linkPattern, 'gm')));

const libraries = linkMatches.map((link) => {
  const { title, url } =
    /** @type {{title:string,url:string}} */
    (/** @type {RegExpMatchArray} */ (link.match(linkPattern)).groups);
  return { title, url };
});

fs.writeFileSync(
  YAML_OUT_PATH,
  yaml.stringify({
    title: 'GameMaker Libraries',
    description:
      "A big ol' list of GameMaker libraries, extensions, tools etc.",
    libraries,
  })
);
