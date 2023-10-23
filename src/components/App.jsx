import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

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
    // const deleted = this.state.contacts.filter(({ id }) => id !== contactId);
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
