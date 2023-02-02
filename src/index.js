import { compareFiles } from './findDiff.js';
import parceFile from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parceFile(filepath1);
  const file2 = parceFile(filepath2);
  const comparedFiles = compareFiles(file1, file2);
  return formatter(comparedFiles, format);
};

export default genDiff;
