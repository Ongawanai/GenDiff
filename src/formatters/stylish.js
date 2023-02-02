const spaceForStatus = 2;
const getSpace = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - spaceForStatus);
const getSpaceBeforeBrecket = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount);

const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const text = Object.entries(value).map(([key, val]) => `${getSpace(depth)}  ${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...text, `${getSpaceBeforeBrecket(depth - 1)}}`].join('\n');
};

const stylish = (resultOfComparing) => {
  const iter = (arr, depth = 1) => {
    const text = arr.map((obj) => {
      const genLine = (val, sign = ' ') => `${getSpace(depth)}${sign} ${obj.key}: ${stringify(val, depth + 1)}`;
      switch (obj.status) {
        case 'unchanged':
          return genLine(obj.value);
        case 'added':
          return genLine(obj.value, '+');
        case 'deleted':
          return genLine(obj.value, '-');
        case 'nested':
          return `${getSpace(depth)}  ${obj.key}: {\n${iter(obj.value, depth + 1)}\n${getSpaceBeforeBrecket(depth)}}`;
        case 'changed':
          return `${genLine(obj.oldValue, '-')}\n${genLine(obj.newValue, '+')}`;
        default:
          throw new Error(`Status ${obj.status} does not supported`);
      }
    });
    return text.join('\n');
  };
  return `{\n${iter(resultOfComparing, 1)}\n}`;
};

export default stylish;
