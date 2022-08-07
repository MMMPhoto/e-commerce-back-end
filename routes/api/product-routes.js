const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all Products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag}]
    });
    res.status(200).json(productData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Get one Product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });
    if (!productData) {
      res.status(400).json({message: 'There is no product with that ID!'});
      return;
    };
    res.status(200).json(productData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    if ('tags' in req.body) {
      const newProductTags = req.body.tags.map(tag => {
        return {
          'product_id': productData.id,
          'tag_id': tag
        }
      });
      await ProductTag.bulkCreate(newProductTags);
    }
    const newProductData = await Product.findByPk(productData.id, {
      include: [{model: Category}, {model: Tag}]
    });  
    res.status(200).json(newProductData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const checkProductId = await Product.findByPk(req.params.id);
    if (!checkProductId) {
      res.status(400).json({message: 'There is no category with that ID!'});
      return;
    };
    await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if ('tags' in req.body) {
      const newProductTags = req.body.tags.map(tag => {
        return {
          'product_id': req.params.id,
          'tag_id': tag
        }
      });
      await ProductTag.destroy({where:{product_id: req.params.id}});
      await ProductTag.bulkCreate(newProductTags);
    }
    const updatedProductData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });
    res.status(200).json(updatedProductData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const checkProductId = await Product.findByPk(req.params.id);
    if (!checkProductId) {
      res.status(400).json({message: 'There is no product with that ID!'});
      return;
    };
    Product.destroy({
      where: {
        id: req.params.id
      }
    });
    const deletedProductId = await Product.findByPk(req.params.id);
    if (!deletedProductId) {
      res.status(200).json({message: 'The product has been successfully deleted!'});
      return;
    };
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
