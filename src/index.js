import path from 'path';
import process from 'process';
import fs from 'fs';
import _ from 'lodash';
import parceFile from './parsers.js';
import formatter from './formatters/index.js';

const findFullPath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

const findExtname = (filepath) => {
  const extname = path.extname(filepath).slice(1);
  return extname;
};

const compareFiles = (file1, file2) => {
  const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

  const result = allKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file2, key)) {
      return { status: 'deleted', name: key, value: value1 };
    }
    if (!_.has(file1, key)) {
      return { status: 'added', name: key, value: value2 };
    }
    if (value1 === value2) {
      return { status: 'unchanged', name: key, value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { status: 'nested', name: key, value: compareFiles(value1, value2) };
    }
    return {
      status: 'changed',
      name: key,
      oldValue: value1,
      newValue: value2,
    };
  });
  return result;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1path = findFullPath(filepath1);
  const file2path = findFullPath(filepath2);

  const file1Extension = findExtname(filepath1);
  const file2Extension = findExtname(filepath2);

  const file1 = fs.readFileSync(file1path);
  const file2 = fs.readFileSync(file2path);

  const object1 = parceFile(file1, file1Extension);
  const object2 = parceFile(file2, file2Extension);

  const comparedFiles = compareFiles(object1, object2);
  return formatter(comparedFiles, format);
};

export default genDiff;
