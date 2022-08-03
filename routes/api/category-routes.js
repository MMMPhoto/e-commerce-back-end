const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  } 
});

// Find one Category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!categoryData) {
      res.status(400).json({message: 'There is no category with that ID!'});
      return;
    } 
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Create a new Category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Update a Category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const checkCategoryId = await Category.findByPk(req.params.id);
    if (!checkCategoryId) {
      res.status(400).json({message: 'There is no category with that ID!'});
      return;
    };
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const updatedCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(updatedCategoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const checkCategoryId = await Category.findByPk(req.params.id);
    if (!checkCategoryId) {
      res.status(400).json({message: 'There is no category with that ID!'});
      return;
    };
    Category.destroy({
      where: {
        id: req.params.id
      }
    });
    const deletedCategoryId = await Category.findByPk(req.params.id);
    if (!deletedCategoryId) {
      res.status(200).json({message: 'The category has been successfully deleted!'});
      return;
    };
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
