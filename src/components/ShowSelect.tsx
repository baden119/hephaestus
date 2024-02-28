'use client';
import Select from 'react-select';
import { HardCodedShowList } from '../data/ShowList';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const showOptions = HardCodedShowList.map((show) => {
  return {
    value: show.name,
    label: show.name,
    key: show.id,
  };
});

console.log(showOptions);
const ShowSelect = () => {
  return (
    <div className='bg-babyPink'>
      <div className='mx-10'>
        <Select options={showOptions} />
      </div>
    </div>
  );
};
export default ShowSelect;
