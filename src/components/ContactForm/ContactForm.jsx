import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.getFormData(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: 200 }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />
        <label htmlFor="tel" style={{ marginTop: 20 }}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          id="tel"
          value={this.state.number}
          onChange={this.handleInputChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
        <button style={{ marginTop: 20, width: 'fit-content' }}>
          Add contact
        </button>
      </form>
    );
  }
}
