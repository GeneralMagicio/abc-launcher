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

export const fetchPolTokenPrice = async () => {
  const coingeckoId = "polygon-ecosystem-token";
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
    );
    const data = await res.json();
    return parseFloat(data[coingeckoId].usd) || 1;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return 1;
  }
};
