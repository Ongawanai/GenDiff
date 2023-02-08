import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extensions = ['yml', 'json'];

const expectedResult = readFileSync(getFixturePath('result.txt'), 'utf-8');
const expectedResultPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const expectedResultJSON = readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

test.each(extensions)('GenDiff test', (ext) => {
  const file1 = getFixturePath(`file1.${ext}`);
  const file2 = getFixturePath(`file2.${ext}`);

  expect(genDiff(file1, file2)).toStrictEqual(expectedResult);
  expect(genDiff(file1, file2, 'plain')).toStrictEqual(expectedResultPlain);
  expect(genDiff(file1, file2, 'json')).toStrictEqual(expectedResultJSON);
});
