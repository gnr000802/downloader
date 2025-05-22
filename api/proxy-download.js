export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { projectID } = req.body;

  try {
    const response = await fetch('https://www.uidux.com/ajax/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Podés agregar headers como cookies o referers si es necesario
      },
      body: new URLSearchParams({ projectID })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Proxy error' });
  }
}
