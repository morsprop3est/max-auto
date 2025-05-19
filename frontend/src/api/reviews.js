export async function fetchReviewsByRegion(regionId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/by-region?regionId=${regionId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [] };
  }
}