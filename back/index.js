
// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors()); // <- habilitar CORS
app.use(express.json()); // <- necesario para leer req.body


const userRoutes = require('./routes/users');
const storyboardRoutes = require('./routes/storyboards');
const storypointRoutes = require('./routes/storypoints');

app.use('/api/users', userRoutes);
app.use('/api/storyboards', storyboardRoutes);
app.use('/api/storypoints', storypointRoutes);

// const OpenAI = require('openai');
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPEN_ROUTER_API_KEY_FREE,
// });


app.get('/api/health', (req, res) => {

  res.json({ status: 'OK', message: 'Backend is running' });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


