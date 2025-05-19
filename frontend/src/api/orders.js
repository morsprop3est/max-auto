export async function sendOrder({ name, phone, comment }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, comment }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error((await res.json()).error || "Помилка відправки заявки");
  return await res.json();
}