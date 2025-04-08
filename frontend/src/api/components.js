export async function fetchComponents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch components");
  }
  return res.json();
}

export async function postOrder(order) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to post order");
  }
  return res.json();
}