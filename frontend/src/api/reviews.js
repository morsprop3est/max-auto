export async function fetchReviewsByRegion(regionId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/by-region?regionId=${regionId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      console.log("Failed to fetch reviews by region");
      return { reviews: [] };
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching reviews by region:", error);
    return { reviews: [] };
  }
}


export async function fetchAllReviews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      console.log("Failed to fetch all reviews");
      return { reviews: [] };
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching all reviews:", error);
    return { reviews: [] };
  }
}