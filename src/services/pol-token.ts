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
