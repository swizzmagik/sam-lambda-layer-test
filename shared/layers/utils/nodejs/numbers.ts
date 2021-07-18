export const roundOff = (num: number): number =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const getMarkupPrice = ({
  basePrice,
  percentage
}: {
  basePrice: any;
  percentage: number;
}) => roundOff(parseFloat(basePrice) * 1.25);

export default {
  roundOff,
  getMarkupPrice
};
