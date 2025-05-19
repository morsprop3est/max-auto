export async function fetchComponents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch components");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching components:", error);
    return { components: [] }; 
  }
}

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

export async function postOrder(order) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to post order");
    }
    return res.json();
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
}