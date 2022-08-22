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
  const [phone, setPhone] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const handleNumberChange = e => {
    setPhone(e.currentTarget.value);
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
      phone,
    };
    addContact({ name, phone });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
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
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleNumberChange}
          value={phone}
          id={numberInputId}
        ></FormInput>
      </FormLabel>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};

// export class ContactForm extends Component {
//   static propTypes = {
//     addContact: PropTypes.func.isRequired,
//   };

//   state = {
//     name: '',
//     number: '',
//   };

//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     const { name, number } = this.state;
//     const { addContact } = this.props;
//     const { resetForm } = this;
//     e.preventDefault();
//     addContact(name, number);
//     resetForm();
//   };

//   resetForm = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     const { name, number } = this.state;
//     const { handleChange, handleSubmit, nameInputId, numberInputId } = this;
//     return (
//       <FormContainer autoComplete="off" onSubmit={handleSubmit}>
//         <FormLabel htmlFor={nameInputId}>
//           Name
//           <FormInput
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             onChange={handleChange}
//             value={name}
//             id={nameInputId}
//           ></FormInput>
//         </FormLabel>
//         <FormLabel htmlFor={numberInputId}>
//           Number
//           <FormInput
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//             onChange={handleChange}
//             value={number}
//             id={numberInputId}
//           ></FormInput>
//         </FormLabel>
//         <Button type="submit">Add contact</Button>
//       </FormContainer>
//     );
//   }
// }
