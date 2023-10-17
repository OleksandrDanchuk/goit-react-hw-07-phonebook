import { useState } from 'react';
import css from './FormAddContacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'components/redux/operations';
import { getContacts } from 'components/redux/selectors';

export const FormAddContacts = () => {
  const [contact, setContact] = useState({ name: '', number: '' });
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const submitAddContact = evt => {
    evt.preventDefault();
    const isExist = contacts.find(
      elem => elem.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) return alert(`${contact.name} is already in contacts`);
    dispatch(addContact(contact));
    setContact({ name: '', number: '' });
  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <>
      <form className={css.form} onSubmit={submitAddContact}>
        <label className={css.label}>
          Name
          <input
            value={contact.name}
            onChange={handleOnChange}
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Z\s]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            value={contact.number}
            onChange={handleOnChange}
            className={css.input}
            type="tel"
            name="number"
            pattern="^[0-9]+$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.form_button}>Add contact</button>
      </form>
    </>
  );
};
