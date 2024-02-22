import React from 'react';
import Select from 'react-select';
import { StyledSelect } from '../styled/ShowSelect.styled';
import { HardCodedShowList } from './ShowList';

const customStyles = {
  option: (defaultStyles, state) => ({
    // You can log the defaultStyles and state for inspection
    // You don't need to spread the defaultStyles
    ...defaultStyles,
    color: state.isSelected ? '#212529' : '#fff',
    backgroundColor: state.isSelected ? '#a0a0a0' : '#212529',
  }),

  control: (defaultStyles) => ({
    ...defaultStyles,
    // Notice how these are all CSS properties
    backgroundColor: '#212529',
    padding: '10px',
    border: 'none',
    boxShadow: 'none',
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#fff' }),
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const showOptions = HardCodedShowList.map((show) => {
  return { key: show.id, value: show.id, label: show.name };
});

const ShowSelect: React.FC = () => {
  console.log(showOptions);
  return (
    <>
      <h2> Show Select </h2>
      <StyledSelect>
        <Select
          options={options}
          placeholder='Select A PBS Show'
          autoFocus
          styles={customStyles}
        />
      </StyledSelect>
      <StyledSelect>
        <Select options={showOptions} />
      </StyledSelect>
    </>
  );
};
export default ShowSelect;
