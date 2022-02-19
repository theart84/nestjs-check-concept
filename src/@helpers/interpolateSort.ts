enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const interpolateSort = (value: string) => {
  const arrayKey = value.split(':');
  return {
    key: arrayKey[0],
    order: arrayKey[1] === Order.ASC ? 1 : -1,
  };
};
