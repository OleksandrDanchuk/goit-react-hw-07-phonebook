import { useState } from 'react';
import css from './FormAddContacts.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'components/redux/operations';
import { getContacts } from 'components/redux/selectors';

export const FormAddContacts = () => {
  const dispatch = useDispatch();
  const currentContacts = useSelector(getContacts);

  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const submitAddContact = evt => {
    evt.preventDefault();
    const { name, number } = evt.target.elements;
    if (!state.name.trim() || !state.number.trim()) {
      alert('Please enter the correct values');
      return;
    }
    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };

    const сheckRepetition = currentContacts.find(
      ({ contact }) =>
        contact.name.toLowerCase() === name.value.toLowerCase() ||
        contact.number === number.value
    );

    сheckRepetition
      ? alert(
          `${name.value} or  number: ${number.value} is already in contacts.`
        )
      : dispatch(addContact(newContact));

    setState({ name: '', number: '' });
  };

  return (
    <>
      <form className={css.form} onSubmit={submitAddContact}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Z\s]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={state.name}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="^[0-9]+$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={state.number}
          />
        </label>
        <button className={css.form_button}>Add contact</button>
      </form>
    </>
  );
};
