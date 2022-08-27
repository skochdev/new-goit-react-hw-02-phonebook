import React, { Component } from 'react';
import * as S from './App.styled';
import { Box } from '../../utils/Box';
import { AddNewContact } from '../AddNewContact/AddNewContact';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

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
        fullName: 'Imaginary Friend',
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

  render() {
    const { handleAddNewContact, handleFilter, handleDeleteContact } = this;
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(
      c =>
        c.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        c.phoneNumber.includes(filter)
    );
    return (
      <main>
        <Box as="section" my={5} maxWidth="600px" mx="auto">
          <Box as="h1" textAlign="center">
            Phonebook
          </Box>
          <AddNewContact onAddNewContact={handleAddNewContact} />
          <Box my={5} textAlign="center">
            <Filter onFilterChange={handleFilter} filterValue={filter} />
          </Box>
          <Box my={5} textAlign="center">
            <ContactList
              contacts={filteredContacts}
              onDeleteContactClick={handleDeleteContact}
            />
          </Box>
          <S.About as={Box} mt={5}>
            <p>
              This is a homework assignment. React class components, TypeScript.
              Utilizing <span>Formik</span> for forms,
              <span> yup</span> for validation,
              <span> Styled Components</span> for styling,
              <span> Styled System</span> for theming, <span>Box</span> custom
              utility component.
            </p>
            <p>
              At this point you're able to add/remove contacts, filter existing
              ones, duplicates are ignored, alert informs about duplication.
            </p>
            <p>Styling is basic, styled components and Box mostly.</p>
          </S.About>
        </Box>
      </main>
    );
  }
}

export default App;
