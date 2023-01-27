import path from 'path';
import process from 'process';
import _ from 'lodash';

export const findFullPath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

export const findExtname = (filepath) => {
  const extname = path.extname(findFullPath(filepath));
  return extname;
};

export const compareFiles = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const allKeys = _.sortBy(_.union(file1Keys, file2Keys));

  const result = allKeys
    .map((key) => {
      if (file2[key] === undefined) {
        return `\n  - ${key}: ${file1[key]}`;
      } else if (file1[key] === undefined) {
        return `\n  + ${key}: ${file2[key]}`;
      } else if (file1[key] === file2[key]) {
        return `\n    ${key}: ${file1[key]}`;
      } else if (file1[key] !== file2[key]) {
        return `\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      }
    })
    .join('');
  const res1 = `{${result}\n}`;
  return res1;
};
