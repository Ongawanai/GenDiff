import fs from 'fs';
import { compareFiles, findFullPath } from './findDiff.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(findFullPath(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(findFullPath(filepath2)));
  return compareFiles(file1, file2);
};

export default genDiff;
