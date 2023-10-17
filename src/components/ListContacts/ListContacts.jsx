import css from './ListContacts.module.css';
import { ElemListContacts } from 'components/ElemListContacts/ElemListContacts';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'components/redux/operations';
import {
  getIsLoading,
  getError,
  contactsToRender,
} from 'components/redux/selectors';

export const ListContacts = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(contactsToRender);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.lists}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {contacts.map(({ id, contact: { name, number } }) => {
        return (
          <ElemListContacts key={id} id={id} name={name} number={number} />
        );
      })}
    </ul>
  );
};
