import Select from 'react-select';
import { HardCodedShowList } from '../data/ShowList';

const showOptions = HardCodedShowList.map((show) => {
  return {
    value: show.name,
    label: show.name,
    key: show.id,
  };
});

const ShowSelect = () => {
  return (
    <div className='bg-babyPink flex justify-between'>
      <div className='hidden w-1/4 md:block'></div>
      <div className='grow'>
        <Select
          maxMenuHeight={500}
          placeholder={'Select A Show'}
          isSearchable={false}
          options={showOptions}
        />
      </div>
      <div className='hidden w-1/4 md:block'></div>
    </div>
  );
};
export default ShowSelect;
