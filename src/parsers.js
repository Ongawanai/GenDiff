/* eslint-disable import/no-extraneous-dependencies */
import yaml from 'js-yaml';

const getParcedContent = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Extension ${extension} does not supported`);
  }
};

export default getParcedContent;
