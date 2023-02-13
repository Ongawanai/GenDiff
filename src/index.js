import path from 'path';
import process from 'process';
import fs from 'fs';
import parceFile from './parsers.js';
import formatter from './formatters/index.js';
import makeAstTree from './makeAstTree.js';

const findFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const findExtname = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1path = findFullPath(filepath1);
  const file2path = findFullPath(filepath2);

  const file1Extension = findExtname(filepath1);
  const file2Extension = findExtname(filepath2);

  const file1 = fs.readFileSync(file1path);
  const file2 = fs.readFileSync(file2path);

  const object1 = parceFile(file1, file1Extension);
  const object2 = parceFile(file2, file2Extension);

  const comparedFiles = makeAstTree(object1, object2);
  return formatter(comparedFiles, format);
};

export default genDiff;
