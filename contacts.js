const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = "./db/contacts.json";
const filePath = path.join(__dirname, contactsPath);

console.log(contactsPath);

/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(filePath, "utf8");

  const contacts = JSON.parse(data);
  //   console.log(contacts);
  return contacts;
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
