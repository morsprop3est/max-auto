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
      return { reviews: [], reviewCounts: [] };
    }
    const data = await res.json();
    if (!data.reviewCounts) {
      const counts = {};
      (data.reviews || []).forEach(r => {
        counts[r.regionId] = (counts[r.regionId] || 0) + 1;
      });
      data.reviewCounts = Object.entries(counts).map(([regionId, count]) => ({ regionId: Number(regionId), count }));
    }
    return data;
  } catch (error) {
    console.log("Error fetching all reviews:", error);
    return { reviews: [], reviewCounts: [] };
  }
}