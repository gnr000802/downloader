export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (para CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { projectID } = req.body;

  try {
    const response = await fetch("https://www.uidux.com/ajax/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://www.uidux.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Cookie": "PHPSESSID=ab3jcurvtjvtrs951p2jjf4h"
      },
      body: new URLSearchParams({ projectID })
    });

    const raw = await response.text();

    // Intentar parsear JSON
    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      return res.status(200).json({ error: "Respuesta no JSON", raw });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en el proxy:", error);
    return res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
