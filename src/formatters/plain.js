export const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

export const plain = (resultOfComparing) => {
  const iter = (arr, parent) => {
    const text = arr
      .flatMap((obj) => {
        const parents = parent ? `${parent}.${obj.key}` : obj.key;
        switch (obj.status) {
          case 'nested':
            return iter(obj.value, parents);
          case 'added':
            return `Property '${parents}' was added with value: ${stringify(obj.value)}`;
          case 'deleted':
            return `Property '${parents}' was removed`;
          case 'unchanged':
            return '';
          case 'changed':
            return `Property '${parents}' was updated. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`;
          default:
            throw new Error(`Status ${obj.status} does not supported`);
        }
      })
      .filter((line) => line.length > 0);
    return text.join('\n');
  };
  return iter(resultOfComparing);
};
