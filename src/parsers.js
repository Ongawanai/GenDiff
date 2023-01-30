/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import yaml from 'js-yaml';
import { findExtname, findFullPath } from './findDiff.js';

export const parseJson = (file) => {
  const parsedFile = JSON.parse(fs.readFileSync(findFullPath(file)));
  return parsedFile;
};

export const parseYaml = (file) => {
  const parsedFile = yaml.load(fs.readFileSync(findFullPath(file)));
  return parsedFile;
};

export const parceFile = (file) => {
  const fileExtname = findExtname(file);
  if (fileExtname === 'json') {
    return parseJson(file);
  }
  return parseYaml(file);
};
