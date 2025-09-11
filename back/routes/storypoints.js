const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET todos los storypoints
router.get("/", async (req, res) => {
  const storypoints = await prisma.storypoint.findMany();
  res.json(storypoints);
});

// GET un storypoint por ID
router.get("/:id", async (req, res) => {
  const storypoint = await prisma.storypoint.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!storypoint) return res.status(404).json({ error: "Storypoint no encontrado" });
  res.json(storypoint);
});

// POST crear storypoint
router.post("/", async (req, res) => {
  const { title, description, storyboardId , image, frame, has_image} = req.body;
  const newStorypoint = await prisma.storypoint.create({
    data: { title, description, storyboardId , image, frame, has_image},
  });
  res.json(newStorypoint);
});

// PUT actualizar storypoint
router.put("/:id", async (req, res) => {
  const { title, description, image, frame, has_image } = req.body;
  const updatedStorypoint = await prisma.storypoint.update({
    where: { id: Number(req.params.id) },
    data: { title, description, image, frame, has_image },
  });
  res.json(updatedStorypoint);
});

// DELETE borrar storypoint
router.delete("/:id", async (req, res) => {
  await prisma.storypoint.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Storypoint eliminado" });
});

module.exports = router;
