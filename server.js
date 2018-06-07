'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let favoritelist = require('./favorite');
let contacts = require('./data');

app.get('/api/contacts', (request, response) => {
  if (!contacts) {
    response.status(404).json({ message: 'No contacts found.' });
  }
  response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  });

  if (!contact) {
    response.status(404).json({ message: 'Contact not found' });
  }

  response.json(contact[0]);
});

app.post('/api/contacts', (request, response) => {

  let contact = {
    id: contacts.length + 1,
    name: request.body.name,
    price: request.body.price,
    no_in_stock: request.body.no_in_stock,
    Company: request.body.Company
  };

  contacts.push(contact);

  response.json(contact);

});

//favorite here
app.get('/api/favoritelist', (request, response) => {
  if (!favoritelist) {
    response.status(404).json({ message: 'No item found.' });
  }
  response.json(favoritelist);
});

app.get('/api/favoritelist/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = favoritelist.filter(contact => {
    return contact.id == contactId;
  });

  if (!contact) {
    response.status(404).json({ message: 'item not found' });
  }

  response.json(contact[0]);
});

app.post('/api/favoritelist', (request, response) => {

  let contact = {
    id: favoritelist.length + 1,
    name: request.body.name,
    price: request.body.price,
    no_in_stock: request.body.no_in_stock,
    Company: request.body.Company
  };

  favoritelist.push(contact);

  response.json(contact);

});

//update products

app.put('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    contact[key] = request.body[key];
  });

  contacts[index] = contact;

  // response.json({ message: `User ${contactId} updated.`});
  response.json(contacts[index]);
});

//delete products
app.delete('/api/contacts/:id', (request, response) => {
  
  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index, 1);

  response.json({ message: `User ${contactId} deleted.`});

});

const hostname = 'localhost';
const port = 3001;

const server = app.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  
});
