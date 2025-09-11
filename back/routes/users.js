const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET todos los usuarios
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// GET un usuario por ID
router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

// POST crear usuario
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await prisma.user.create({ data: { name, email } });
  res.json(newUser);
});

// PUT actualizar usuario
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { name, email },
  });
  res.json(updatedUser);
});

// DELETE borrar usuario
router.delete("/:id", async (req, res) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Usuario eliminado" });
});

module.exports = router;
