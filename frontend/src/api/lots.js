export const fetchLots = async ({ page = 1, limit = 10, filters = {} }) => {
    const { bodyType, fuelType, minPrice, maxPrice } = filters;
  
    const params = new URLSearchParams({
      page,
      limit,
      bodyType: bodyType || '',
      fuelType: fuelType || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
    });
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lots?${params}`);
      if (!response.ok) {
        return { lots: [], totalLots: 0 };
      }
  
      return await response.json();
    } catch (error) {
      return { lots: [], totalLots: 0 };
    }
  };