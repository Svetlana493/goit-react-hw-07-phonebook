import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Button,
  FormContainer,
  FormInput,
  FormLabel,
} from './ContactForm.styled';
import { usePhonebook } from 'redux/phonebookSlice';

export const ContactForm = () => {
  const { contacts, addContact } = usePhonebook();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const handleNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      contacts.some(
        contactItem => contactItem.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    addContact(contact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormContainer autoComplete="off" onSubmit={handleSubmit}>
      <FormLabel htmlFor={nameInputId}>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleNameChange}
          value={name}
          id={nameInputId}
        ></FormInput>
      </FormLabel>
      <FormLabel htmlFor={numberInputId}>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleNumberChange}
          value={number}
          id={numberInputId}
        ></FormInput>
      </FormLabel>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};
