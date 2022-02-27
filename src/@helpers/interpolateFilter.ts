import { IWhere } from 'src/@interfaces/query-product.interface';

const hashOperators = {
  eq: '$eq',
  ne: '$ne',
  lt: '$lt',
  lte: '$lte',
  gt: '$gt',
  gte: '$gte',
  contains: '$regex',
};

export const interpolateFilter = (value: string[]) => {
  if (value.length > 1) {
    return value.reduce(
      (acc, prev) => {
        const convertStringToObject = JSON.parse(prev);
        const splitKey = Object.keys(convertStringToObject)[0].split('_');
        acc.$and.push({
          [splitKey[0]]: {
            [hashOperators[splitKey[1]]]: Object.values(
              convertStringToObject,
            )[0],
          },
        });
        return acc;
      },
      { $and: [] },
    );
  } else {
    const convertStringToObject = JSON.parse(value[0]);
    const splitKey = Object.keys(convertStringToObject)[0].split('_');
    return {
      [splitKey[0]]: {
        [hashOperators[splitKey[1]]]: Object.values(convertStringToObject)[0],
      },
    };
  }
};
