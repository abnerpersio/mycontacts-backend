const ContactsRespository = require('../repositories/ContactsRespository');
const { isValidUUID } = require('../utils/isValidUUID');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRespository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Contact id' });
    }

    const contact = await ContactsRespository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid Category' });
    }

    if (email) {
      const contactExists = await ContactsRespository.findByEmail(email);

      if (contactExists) {
        return res.status(404).json({ error: 'This email is already in use' });
      }
    }

    const contact = await ContactsRespository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.status(201).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid Category' });
    }

    const contactExists = await ContactsRespository.findById(id);

    if (!contactExists) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactEmailExists = await ContactsRespository.findByEmail(email);

      if (contactEmailExists && contactEmailExists.id !== id) {
        return res.status(404).json({ error: 'This email is already saved' });
      }
    }

    const contact = await ContactsRespository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid Contact id' });
    }

    await ContactsRespository.delete(id);

    res.sendStatus(204);
  }
}

/*
 * index, show, store, update, delete
 */

module.exports = new ContactController();
