import dotenv from "dotenv"
import OpenAI from "openai"
import fs from "fs" 

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY_FREE
  // ,
  // defaultHeaders: {
  //   "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  //   "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  // },
});



async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview:free",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "tell me a story about a brave knight and generate an image for it"
            },
          ]
        }
      ],
      
    });
    const responseMessage = completion.choices[0].message;
    if (responseMessage.images && responseMessage.images.length > 0) {
      console.log("\nImágenes encontradas. Creando archivo(s) HTML...");
      responseMessage.images.forEach((imageObj, index) => {
        const imageDataURI = imageObj.image_url.url; // Esta es la cadena base64
        const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Imagen Generada ${index + 1}</title>
  </head>
  <body>
      <h1>Imagen generada por la API:</h1>
      <img src="${imageDataURI}" alt="Imagen generada" style="max-width: 100%;">
  </body>
  </html>
                  `;

                  const fileName = `imagen_generada_${index + 1}.html`;
                  fs.writeFileSync(fileName, htmlContent);
                  console.log(`✅ Archivo HTML creado: ${fileName}`);
              });
    } else {
      console.log("No se encontraron imágenes en la respuesta de la API.");
    }
  } catch (error) {
      console.error("Ocurrió un error al llamar a la API:", error);
  }
}

main();