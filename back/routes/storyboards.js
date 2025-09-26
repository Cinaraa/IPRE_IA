const express = require('express');
const { createStoryboard } = require('../controllers/storyboardController');
const prisma = require("../prisma");

const router = express.Router();

router.post('/', createStoryboard);

// GET todos los storyboards
router.get("/", async (req, res) => {
  const storyboards = await prisma.storyboard.findMany();
  res.json(storyboards);
});

// GET un storyboard por ID con sus storypoints
router.get("/:id", async (req, res) => {
  const storyboard = await prisma.storyboard.findUnique({
    where: { id: Number(req.params.id) },
    include: { storypoints: true },
  });
  if (!storyboard) return res.status(404).json({ error: "Storyboard no encontrado" });
  res.json(storyboard);
});

// PUT actualizar storyboard
router.put("/:id", async (req, res) => {
  const { title, prompt, imageReff } = req.body;
  const updatedStoryboard = await prisma.storyboard.update({
    where: { id: Number(req.params.id) },
    data: { title, prompt, imageReff },
  });
  res.json(updatedStoryboard);
});

// DELETE borrar storyboard
router.delete("/:id", async (req, res) => {
  await prisma.storyboard.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Storyboard eliminado" });
});

module.exports = router;
