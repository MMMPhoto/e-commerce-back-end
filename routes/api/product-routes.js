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

// create new product
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
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
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
