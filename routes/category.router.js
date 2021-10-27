const express = require('express');
const router = express.Router();

router.get('/:categoriaId/productos/:productosId', (req, res) => {
  const { categoriaId, productosId } = req.params;
  res.json({
    categoriaId,
    productosId,
    name: 'Producto 1',
    price: 100
  });
});

module.exports = router;
