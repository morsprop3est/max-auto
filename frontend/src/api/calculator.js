export async function calculateCarPrice(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calculator/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Помилка розрахунку");
  return await res.json();
}