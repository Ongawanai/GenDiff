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
      if (obj.status === 'unchanged') {
        return `${getSpace(depth)}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
      }
      if (obj.status === 'added') {
        return `${getSpace(depth)}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
      }
      if (obj.status === 'deleted') {
        return `${getSpace(depth)}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
      }
      if (obj.status === 'nested') {
        return `${getSpace(depth)}  ${obj.key}: {\n${iter(obj.value, depth + 1)}\n${getSpaceBeforeBrecket(depth)}}`;
      }
      if (obj.status === 'changed') {
        const oldValue = `${getSpace(depth)}- ${obj.key}: ${stringify(obj.oldValue, depth + 1)}`;
        const newValue = `${getSpace(depth)}+ ${obj.key}: ${stringify(obj.newValue, depth + 1)}`;
        return [oldValue, newValue].join('\n');
      }
      return obj;
    });
    return text.join('\n');
  };
  return `{\n${iter(resultOfComparing, 1)}\n}`;
};

export default stylish;
