const { PrismaClient } = require('@prisma/client');
const OpenAI = require('openai');

const prisma = new PrismaClient();
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY_FREE,
});

// Crear un storyboard y sus storypoints
const createStoryboard = async (req, res) => {
  try {

    const { title, prompt, imageUrl, userId } = req.body;
    let length = req.body.length

    if (!title || !prompt || !userId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (!length || length < 1 || length > 20) {
        length = 5; // valor por defecto
    }
    // 1. Crear storyboard
    const storyboard = await prisma.storyboard.create({
      data: {
        title,
        prompt,
        imageReff: imageUrl || null,
        userId,
        length,
      },
    });


    // 2. Generar storypoints con IA
    const completion = await openai.chat.completions.create({
      
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "system",
          content: "Responde SOLO en JSON válido. No agregues texto extra."
        },
        {
          role: "user",
          content: `
            Genera una historia dividida en exactamente ${length} "storypoints".
            Cada storypoint debe tener un "title" y un "description".
            Devuélvelo en este formato:
            {
              "storypoints": [
                { "title": "...", "description": "..." },
                { "title": "...", "description": "..." }
              ]
            }
            Usa este prompt como base: "${prompt}"
          `
        }
      ],
    });

    let raw = completion.choices[0].message.content.trim();
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json\n?/, "").replace(/```$/, "");
    }

    const parsed = JSON.parse(raw);
    const generatedStorypoints = parsed.storypoints;

    // 3. Guardar storypoints en DB
    const storypoints = await prisma.$transaction(
      generatedStorypoints.map((sp, index) =>
        prisma.storypoint.create({
          data: {
            title: sp.title,
            description: sp.description,
            frame: index + 1,
            storyboardId: storyboard.id,
          },
        })
      )
    );

    // 4. Respuesta completa
    res.status(201).json({
      storyboard,
      storypoints,
    });

  } catch (error) {
    console.error("Error creando storyboard:", error);
    res.status(500).json({ error: "Error creando storyboard y storypoints" });
  }
};

module.exports = {
  createStoryboard,
};
