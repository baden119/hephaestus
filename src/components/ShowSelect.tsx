"use client";
import Select from "react-select";
import CurrentShows from "../data/currentShows.json";

interface ShowSelect_props {
  // TODO Typing for callback function
  ShowSelectCallback: any;
}

const ShowSelect = ({ ShowSelectCallback }: ShowSelect_props) => {
  let selectOptions = CurrentShows.map((show, index) => {
    return {
      label: show.name,
      value: index,
      url: show.programRestUrl,
    };
  });

  const handleSelect = (e: any) => {
    ShowSelectCallback({
      SelectedShowURL: e.url,
      SelectedShowName: e.label,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className="grow my-3 mx-1">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="ShowSelect"
        >
          PBS Show
        </label>
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
