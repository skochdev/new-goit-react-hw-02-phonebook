import React, { Component } from 'react';
import { Box } from '../utils/Box';
import { AddNewContact } from './AddNewContact/AddNewContact';

export type Contact = {
  fullName: string;
  phoneNumber: string;
  id: string;
};

type State = {
  contacts: Contact[];
  name: string;
};

class App extends Component {
  state: State = {
    contacts: [
      {
        fullName: 'Skochii Bohdan',
        phoneNumber: '+38093306553',
        id: '123456sdf234sdfsd',
      },
    ],
    name: '',
  };

  handleAddNewContact = (newContact: Contact) => {
    console.log(this.state.contacts);
    this.setState((prevState: State) => ({
      contacts: [...prevState.contacts, newContact],
    }));
    console.log(this.state.contacts);
  };

  render() {
    const { handleAddNewContact } = this;
    return (
      <main>
        <Box my={4} mx={4}>
          <Box as="h1" textAlign="center">
            Phonebook
          </Box>
          <AddNewContact onAddNewContact={handleAddNewContact} />
          {this.state.contacts.map(c => (
            <li>{c.fullName}</li>
          ))}
        </Box>
      </main>
    );
  }
}

export default App;
