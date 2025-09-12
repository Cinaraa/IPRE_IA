
// index.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // <- necesario para leer req.body

const userRoutes = require('./routes/users');
const storyboardRoutes = require('./routes/storyboards');
const storypointRoutes = require('./routes/storypoints');

app.use('/api/users', userRoutes);
app.use('/api/storyboards', storyboardRoutes);
app.use('/api/storypoints', storypointRoutes);

const OpenAI = require('openai');
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY_FREE,
});




app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});


