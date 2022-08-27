import React, { Component } from 'react';
import { Box } from '../utils/Box';
import { AddNewContact } from './AddNewContact/AddNewContact';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './FilterContacts/FilterContacts';

export type Contact = {
  fullName: string;
  phoneNumber: string;
  id: string;
};

type State = {
  contacts: Contact[];
  filter: string;
};

class App extends Component {
  state: State = {
    contacts: [
      {
        fullName: 'Skochii Bohdan',
        phoneNumber: '+38093306553',
        id: '123456sdf234sdfsd',
      },
      {
        fullName: 'Hlushchenko Mariia',
        phoneNumber: '+380637463981',
        id: '12345sd1216sdf234sdfsd',
      },
    ],
    filter: '',
  };

  handleAddNewContact = (newContact: Contact) => {
    const isDuplicate = this.checkForDuplicate(newContact.fullName);

    if (!isDuplicate) {
      this.setState((prevState: State) => ({
        contacts: [...prevState.contacts, newContact],
        filter: '',
      }));
    }
  };

  checkForDuplicate = (name: string) => {
    let { contacts } = this.state;
    let normalizedName = name.toLowerCase();

    return contacts.some(contact =>
      contact.fullName.toLowerCase().includes(normalizedName)
    );
  };

  handleFilter = (filterValue: string) => {
    this.setState({ filter: filterValue });
  };

  handleDeleteContact = (id: string) => {
    this.setState((prevState: State) => ({
      contacts: prevState.contacts.filter(c => c.id !== id),
    }));
  };

  render() {
    const { handleAddNewContact, handleFilter, handleDeleteContact } = this;
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(c =>
      c.fullName.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <main>
        <Box as="section" my={4} mx={4}>
          <Box as="h1" textAlign="center">
            Phonebook
          </Box>
          <AddNewContact onAddNewContact={handleAddNewContact} />
          <Box my={4} textAlign="center">
            <FilterContacts
              onFilterChange={handleFilter}
              filterValue={filter}
            />
          </Box>
          <Box my={4} textAlign="center">
            <ContactList
              contacts={filteredContacts}
              onDeleteContactClick={handleDeleteContact}
            />
          </Box>
        </Box>
      </main>
    );
  }
}

export default App;
