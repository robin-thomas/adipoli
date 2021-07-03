import { useState, useContext, createRef, useEffect } from 'react';

import { Box, TextField } from '@material-ui/core';

import { DataContext } from '../../utils/DataProvider';

const StepperFormInput = ({ label, state, set, keyName }) => {
  const [autocomplete, setAutocomplete] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = createRef();
  const ctx = useContext(DataContext);

  useEffect(() => {
    const clickHandler = () => setAutocomplete([]);
    document.addEventListener('click', clickHandler);

    if (ctx.validAirports[keyName]) {
      ref.current.classList.add('is-valid');
    }

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const closeAutocomplete = (name, airports = []) => {
    setAutocomplete(airports);
    setActiveIndex(0);
    set(name, false /* isValid */);
  };

  const onChange = (name, target) => {
    if (name === null || name === undefined || name.trim().length === 0) {
      closeAutocomplete(name);
    } else {
      const _airports = Object.keys(ctx.airports).filter((e) => {
        target.classList.remove('is-valid');
        target.classList.remove('is-invalid');

        if (e.toLowerCase().startsWith(name.toLowerCase())) {
          return true;
        }

        if (ctx.airports[e].iata.toLowerCase().startsWith(name.toLowerCase())) {
          return true;
        }

        return false;
      });
      closeAutocomplete(name, _airports);
    }

    ref.current.classList.remove('is-invalid');
    ref.current.classList.remove('is-valid');
  };

  const onSelect = (name) => {
    closeAutocomplete(name);
    set(name, true /* isValid */);

    ref.current.classList.remove('is-invalid');
    ref.current.classList.add('is-valid');
  };

  const onKeyDown = (e) => {
    // Esc key.
    if (e.keyCode === 27) {
      closeAutocomplete('');
    }
    // Enter key.
    else if (
      e.keyCode === 13 &&
      activeIndex >= 0 &&
      activeIndex <= autocomplete.length - 1
    ) {
      onSelect(autocomplete[activeIndex]);
    }
    // Arrow up.
    else if (e.keyCode === 38 && activeIndex > 0) {
      setActiveIndex((activeIndex) => activeIndex - 1);
    }
    // Arrow down.
    else if (e.keyCode === 40 && activeIndex < autocomplete.length - 1) {
      setActiveIndex((activeIndex) => activeIndex + 1);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <TextField
        inputRef={ref}
        label={label}
        value={state ? state : ''}
        onChange={(e) => onChange(e.target.value, e.target)}
        onKeyDown={onKeyDown}
        fullWidth
        variant="standard"
      />
      {autocomplete && autocomplete.length > 0 ? (
        <ul className="mdb-autocomplete-wrap">
          {autocomplete.map((name, index) => (
            <li
              key={index}
              className={`list-item ${activeIndex === index ? 'active' : ''}`}
              style={{ background: 'rgb(255, 255, 255) ' }}
              onClick={() => onSelect(name)}
            >
              <span>{name}</span>
              <b>&nbsp;({ctx.airports[name].iata})</b>
            </li>
          ))}
        </ul>
      ) : null}
    </Box>
  );
};

export default StepperFormInput;
