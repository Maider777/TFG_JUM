function crearId() {
  return Math.random().toString(36).substr(2, 22);
}

module.exports = {
  crearId,
};
