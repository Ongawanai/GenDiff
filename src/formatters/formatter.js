import stylish from './stylish.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unknown style format: ${format}`);
  }
};

export default formatter;
