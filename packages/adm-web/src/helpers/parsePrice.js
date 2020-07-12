export default (value) => {
  let formattedValue = Number(value).toFixed(2);
  return `R$ ${formattedValue}`.replace('.', ',');
};
