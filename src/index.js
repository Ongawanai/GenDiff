import { compareFiles } from './findDiff.js';
import parceFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parceFile(filepath1);
  const file2 = parceFile(filepath2);
  return compareFiles(file1, file2);
};

export default genDiff;
