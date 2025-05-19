export const fetchLots = async ({ page = 1, limit = 50, filters = null }) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...(filters?.bodyTypeSlug && { bodyTypeSlug: filters.bodyTypeSlug }),
      ...(filters?.fuelTypeSlug && { fuelTypeSlug: filters.fuelTypeSlug }),
      ...(filters?.minPrice && { minPrice: filters.minPrice }),
      ...(filters?.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters?.minYear && { minYear: filters.minYear }),
      ...(filters?.maxYear && { maxYear: filters.maxYear }),
      ...(filters?.minEngineSize && { minEngineSize: filters.minEngineSize }),
      ...(filters?.maxEngineSize && { maxEngineSize: filters.maxEngineSize }),
      ...(filters?.sortBy && { sortBy: filters.sortBy }),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lots?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      return { lots: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching lots:', error.message);
    return { lots: [] };
  }
};