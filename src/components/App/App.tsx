import React, { Component } from 'react';
import * as S from './App.styled';
import { Box } from '../../utils/Box';
import { AddNewContact } from '../AddNewContact/AddNewContact';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { About } from '../About/About';

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
    // placeholder, dummy contacts
    contacts: [
      {
        fullName: 'Skochii Bohdan',
        phoneNumber: '+38093306553',
        id: '123456sdf234sdfsd',
      },
      {
        fullName: 'Erlich Bachman',
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
    } else {
      alert(`${newContact.fullName} is already is your contact list`);
    }
  };

  checkForDuplicate = (name: string) => {
    let { contacts } = this.state;
    let normalizedNewName = name.toLowerCase();

    return contacts.some(
      contact => contact.fullName.toLowerCase() === normalizedNewName
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

  getFilteredContacts = (contacts: Contact[]) => {
    const { filter } = this.state;
    return contacts.filter(
      (c: Contact) =>
        c.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        c.phoneNumber.includes(filter)
    );
  };

  render() {
    const {
      handleAddNewContact,
      handleFilter,
      handleDeleteContact,
      getFilteredContacts,
    } = this;
    const { contacts, filter } = this.state;
    const filteredContacts = getFilteredContacts(contacts);

    return (
      <Box as="main" mx={4}>
        <Box as="section" my={5} maxWidth="600px" mx="auto">
          <Box as="h1" textAlign="center">
            Phonebook
          </Box>
          <AddNewContact onAddNewContact={handleAddNewContact} />
          <Box my={5} mx={4}>
            <Filter onFilterChange={handleFilter} filterValue={filter} />
          </Box>
          <Box my={5} textAlign="center">
            <ContactList
              contacts={filteredContacts}
              onDeleteContactClick={handleDeleteContact}
            />
          </Box>
          <S.About as={Box} mt={5}>
            <About />
          </S.About>
        </Box>
      </Box>
    );
  }
}

export default App;
