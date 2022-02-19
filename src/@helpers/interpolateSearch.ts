export const interpolateSearch = (value: string) => {
  return {
    $text: {
      $search: value,
      $language: 'ru',
    },
  };
};
