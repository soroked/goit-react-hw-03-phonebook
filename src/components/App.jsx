import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

// Data to test the App

// const contacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const lsContacts = JSON.parse(localStorage.getItem('contacts')) ?? [];

    if (lsContacts.length) {
      this.setState({ contacts: lsContacts });
    }
  }

  componentDidUpdate(_, { contacts }) {
    if (this.state.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    const lsContacts = JSON.parse(localStorage.getItem('contacts'));

    if (!lsContacts.length) {
      console.log('asd');
      localStorage.removeItem('contacts');
    }
  }

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  getFormData = data => {
    const id = nanoid(8);
    const obj = { id, ...data };

    // ==================== Task 5 ====================
    const normalizedName = data.name.toLowerCase();
    const nameExists = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === normalizedName
    );
    if (nameExists) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    // ==================== /Task 5 ====================

    this.setState(prevState => {
      return { contacts: [obj, ...prevState.contacts] };
    });
  };

  deleteHandler = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const normalizedName = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedName)
    );

    return (
      <div
        style={{
          height: '100vh',
          padding: 40,
          fontSize: 18,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm getFormData={this.getFormData} />
        {this.state.contacts.length !== 0 && (
          <>
            <h2>Contacts</h2>
            <Filter
              filter={this.state.filter}
              handleInputChange={this.handleInputChange}
            />
            <ContactList deleteHandler={this.deleteHandler}>
              {visibleContacts}
            </ContactList>
          </>
        )}
      </div>
    );
  }
}
