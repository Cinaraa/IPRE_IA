const prisma = require("../prisma");

// GET todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

// GET un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
};

// POST crear usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creando usuario" });
  }
};

// PUT actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name, email, password },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando usuario" });
  }
};

// DELETE borrar usuario
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando usuario" });
  }
};


module.exports = router;
