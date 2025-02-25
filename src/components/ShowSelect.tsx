"use client";
import Select from "react-select";
import CurrentShowList from "../data/CurrentShowList.json";

interface ShowSelect_props {
  // TODO Typing for callback function
  loggedIn: boolean;
  callback?: any;
}

const ShowSelect = ({ loggedIn, callback }: ShowSelect_props) => {
  let selectOptions = CurrentShowList.map((show) => {
    return {
      label: show.name,
      value: show.id,
      url: show.url,
    };
  });

  const handleSelect = (e: any) => {
    callback({
      SelectedShowURL: e.url,
      SelectedShowName: e.label,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      {/* TODO Add 'PBS Show' Label */}
      <div className="grow my-3 mx-1">
        <Select
          maxMenuHeight={500}
          placeholder={"Select A Show"}
          isSearchable={false}
          options={selectOptions}
          instanceId={"ShowSelect"}
          onChange={handleSelect}
        />
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default ShowSelect;
