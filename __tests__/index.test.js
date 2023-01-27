import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('result.txt'), 'utf-8');
const actualResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

test('genDiff', () => {
  expect(actualResult).toStrictEqual(expectedResult);
});
