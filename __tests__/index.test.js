import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('result.txt'), 'utf-8');
const expectedResultPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const expectedResultJSON = readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

const actualResultStylish = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
const actualResultPlain = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
const actualResultJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');

test('genDiffJsonYaml', () => {
  expect(actualResultStylish).toStrictEqual(expectedResult);
});

test('genDiffPlain', () => {
  expect(actualResultPlain).toStrictEqual(expectedResultPlain);
});

test('genDiffJSON', () => {
  expect(actualResultJSON).toStrictEqual(expectedResultJSON);
});
