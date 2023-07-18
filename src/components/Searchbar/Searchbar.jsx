import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Searchbar({ onSubmit }) {
  const [serchQuery, setSerchQuery] = useState('');

  const handleChangeQuery = ({ target }) => {
    setSerchQuery(target.value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (serchQuery.trim() === '') {
      return toast.warning('Write valid parameter');
    }
    onSubmit(serchQuery);
    setSerchQuery('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmitForm}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <label htmlFor="serchQuery">
          <input
            className="input"
            type="text"
            autoComplete="off"
            name="serchQuery"
            autoFocus
            placeholder="Search images and photos"
            value={serchQuery}
            onChange={handleChangeQuery}
          />
        </label>
      </form>
    </header>
  );
}
