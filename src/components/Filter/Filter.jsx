import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterValue } from 'components/redux/contactSlice';
import { getFilter } from 'components/redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div className={css.filter_container}>
      <p>Find contacts by name</p>
      <input
        className={css.filter_input}
        type="text"
        name="filter"
        onChange={e => dispatch(filterValue(e.target.value))}
        value={filter}
      />
    </div>
  );
};
