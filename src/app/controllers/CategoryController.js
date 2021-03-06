const CategoriesRepository = require('../repositories/CategoriesRepository');
const { isValidUUID } = require('../utils/isValidUUID');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();

    res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Category id' });
    }

    const category = await CategoriesRepository.findById(id);

    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Category id' });
    }

    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.update(id, { name });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Category id' });
    }

    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }
}

/*



 * index, show, store, update, delete



 */

module.exports = new CategoryController();
