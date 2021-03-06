// Copyright (C) 2015 MetaBrainz Foundation
//
// This file is part of MusicBrainz, the open internet music database,
// and is licensed under the GPL version 2, or (at your option) any
// later version: http://www.gnu.org/licenses/gpl-2.0.txt

const _ = require('lodash');

const escapeRegExp = require('../utility/escapeRegExp');

function varReplacement(args, key) {
  return _.get(args, key, `{${key}}`);
}

function anchor(args, hrefProp, textProp, callback) {
  const href = args[hrefProp];

  if (href === undefined) {
    return `{${hrefProp}|${textProp}}`;
  }

  return callback(
    _.isObject(href) ? href : {href},
    _.get(args, textProp, textProp),
  );
}

function textAnchor(props, text) {
  const attributes = (
    _(props)
      .keys()
      .sort()
      .map(k => `${k}="${_.escape(props[k])}"`)
      .join(' ')
  );
  return `<a ${attributes}>${_.escape(text)}</a>`;
}

// Adapted from `sub _expand` in lib/MusicBrainz/Server/Translation.pm
function expand(string, args) {
  if (!string) {
    return '';
  }

  const re = _(args).keys().map(escapeRegExp).join('|');
  const linksRegex = new RegExp(`\\{(${re})\\|(.*?)\\}`, 'g');
  const namesRegex = new RegExp(`\\{(${re})\\}`, 'g');

  return _expand(string, args, linksRegex, namesRegex);
}

function _expand(string, args, linksRegex, namesRegex) {
  return string
    .replace(linksRegex, (match, p1, p2) => anchor(args, p1, p2, textAnchor))
    .replace(namesRegex, (match, p1) => varReplacement(args, p1));
}

module.exports = expand;
