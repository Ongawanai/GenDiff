/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import yaml from 'js-yaml';
import { findExtname, findFullPath } from './findDiff.js';

const parceFile = (file) => {
  const fileExtname = findExtname(file);
  if (fileExtname === 'json') {
    const parsedFile = JSON.parse(fs.readFileSync(findFullPath(file)));
    return parsedFile;
  }
  const parsedFile = yaml.load(fs.readFileSync(findFullPath(file)));
  return parsedFile;
};

export default parceFile;
