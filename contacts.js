const fs = require('fs/promises');
const path = require("path");
const shortid = require('shortid');

const contactsPath = path.resolve('./db/contacts.json');
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null , 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
};

const getContactById = async(id) => {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === id);
    return contact || null;
};

const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1) {
        return false;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

