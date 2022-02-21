const ContactsRespository = require('../repositories/ContactsRespository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRespository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRespository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRespository.findByEmail(email);

    if (contactExists) {
      return res.status(404).json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRespository.create({
      name,

      email,

      phone,

      category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRespository.findById(id);

    if (!contactExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const contactEmailExists = await ContactsRespository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return res.status(404).json({ error: 'This email is already saved' });
    }

    const contact = await ContactsRespository.update(id, {
      name,

      email,

      phone,

      category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactsRespository.delete(id);

    res.sendStatus(204);
  }
}

/*







 * index, show, store, update, delete







 */

module.exports = new ContactController();
