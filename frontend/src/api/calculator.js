export async function calculateCarPrice(data) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calculator/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      console.log("Failed to calculate car price");
      return null;
    }
    return await res.json();
  } catch (error) {
    console.log("Error calculating car price:", error);
    return null;
  }
}