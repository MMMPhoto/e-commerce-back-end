const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Product.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagData) {
      res.status(400).json({message: 'There is no tag with that ID!'});
      return;
    };
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const checkTagId = await Tag.findByPk(req.params.id);
    if (!checkTagId) {
      res.status(400).json({message: 'There is no tag with that ID!'});
      return;
    };
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const updatedTagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(updatedTagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const checkTagId = await Tag.findByPk(req.params.id);
    if (!checkTagId) {
      res.status(400).json({message: 'There is no tag with that ID!'});
      return;
    };
    Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    const deletedTagId = await Tag.findByPk(req.params.id);
    if (!deletedTagId) {
      res.status(200).json({message: 'The tag has been successfully deleted!'});
      return;
    };
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
