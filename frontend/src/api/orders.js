export async function sendOrder({ name, phone, comment }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, comment }),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.log("Failed to send order");
      return null;
    }
    return await res.json();
  } catch (error) {
    console.log("Error sending order:", error);
    return null;
  }
}