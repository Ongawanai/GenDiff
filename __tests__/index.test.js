import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('result.txt'), 'utf-8');
const actualResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const actualResultYaml = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
const actualResultJsonYaml = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));

test('genDiffJson', () => {
  expect(actualResultJson).toStrictEqual(expectedResult);
});

test('genDiffYaml', () => {
  expect(actualResultYaml).toStrictEqual(expectedResult);
});

test('genDiffJsonYaml', () => {
  expect(actualResultJsonYaml).toStrictEqual(expectedResult);
});
