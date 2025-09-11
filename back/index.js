
// index.js
const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(express.json()); // <- necesario para leer req.body

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY_FREE,
});

app.post("/api/story", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt requerido" });
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free", // 👈 usa solo texto, no la variante de imagen
      messages: [
        {
      role: "system",
      content: "Eres un asistente que solo responde en JSON válido. No uses texto extra, ni explicaciones.",
        },
        {
          role: "user",
          content: `
            Genera una historia dividida en exactamente 6 "storypoints".
            Cada storypoint debe tener un "title" y un "description".
            El resultado debe ser un JSON en este formato:

            {
              "storypoint_1": { "title": "...", "description": "..." },
              "storypoint_2": { "title": "...", "description": "..." },
              "storypoint_3": { "title": "...", "description": "..." },
              "storypoint_4": { "title": "...", "description": "..." },
              "storypoint_5": { "title": "...", "description": "..." },
              "storypoint_6": { "title": "...", "description": "..." }
            }

            Usa el siguiente prompt como base de la historia:
            "${prompt}"
                  `,      },
      ],
      });
      let raw = completion.choices[0].message.content.trim();

      // 👇 Limpieza: si viene con ```json ... ```
      if (raw.startsWith("```")) {
        raw = raw.replace(/```json\n?/, "").replace(/```$/, "");
      }

      let storyJson;
      try {
        storyJson = JSON.parse(raw);
      } catch (e) {
        console.error("Error parseando JSON:", e, raw);
        return res.status(500).json({ error: "Formato inválido", raw });
      }

      res.json(storyJson);
    } catch (error) {
      console.error("Error llamando a la API:", error);
      res.status(500).json({ error: "Error generando la historia" });
    }
  });



app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});


