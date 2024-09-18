/**
 * Formats a number with commas as thousand separators.
 * For example, 1000 becomes "1,000" and 1000000 becomes "1,000,000".
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string with commas separating thousands.
 */
export const formatCurrencyAmount = (number: number, precision = 2) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};
