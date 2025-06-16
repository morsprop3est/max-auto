export async function fetchComponents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.log("Failed to fetch components");
      return null;
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching components:", error);
    return null; 
  }
}

export async function fetchReviewsByRegion(regionId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/by-region?regionId=${regionId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      console.log("Failed to fetch reviews");
      return { reviews: [] };
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching reviews:", error);
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
      console.log("Failed to post order");
      return null;
    }
    return res.json();
  } catch (error) {
    console.log("Error posting order:", error);
    return null;
  }
}