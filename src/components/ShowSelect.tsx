'use client';
import Select from 'react-select';
import RawShowList from '../data/FullShowList.json' assert { type: 'json' };
import CurrentShowList from '../data/CurrentShowList.json';

const getFullShowList = () => {
  let ShowList = [];

  for (let i = 0; i < RawShowList.length; i++) {
    ShowList.push({
      id: i,
      name: RawShowList[i].name,
      archived: RawShowList[i].archived,
      url: RawShowList[i].programRestUrl,
    });
  }
};

const getArchivedShowList = (archived: boolean) => {
  let ShowList = [];
  for (let i = 0; i < RawShowList.length; i++) {
    if (RawShowList[i].archived === archived)
      ShowList.push({
        id: i,
        name: RawShowList[i].name,
        archived: RawShowList[i].archived,
        url: RawShowList[i].programRestUrl,
      });
  }
  console.log(ShowList);
};

const ShowSelect = () => {
  let selectOptions = CurrentShowList.map((show) => {
    return {
      label: show.name,
      value: show.id,
    };
  });

  return (
    <div className='flex justify-between'>
      <div className='hidden w-1/4 md:block'></div>
      <div className='grow my-3 mx-1'>
        <Select
          maxMenuHeight={500}
          placeholder={'Select A Show'}
          isSearchable={false}
          options={selectOptions}
          instanceId={'ShowSelect'}
        />
      </div>
      <div className='hidden w-1/4 md:block'></div>
    </div>
  );
};
export default ShowSelect;
