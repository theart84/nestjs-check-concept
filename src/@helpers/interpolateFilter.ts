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

export const interpolateFilter = (value: IWhere[]) => {
  if (value.length > 1) {
    return value.reduce(
      (acc, prev) => {
        const splitKey = Object.keys(prev)[0].split('_');
        acc.$and.push({
          [splitKey[0]]: {
            [hashOperators[splitKey[1]]]: Object.values(prev)[0],
          },
        });
        return acc;
      },
      { $and: [] },
    );
  } else {
    const splitKey = Object.keys(value[0])[0].split('_');
    return {
      [splitKey[0]]: {
        [hashOperators[splitKey[1]]]: Object.values(value[0])[0],
      },
    };
  }
};
