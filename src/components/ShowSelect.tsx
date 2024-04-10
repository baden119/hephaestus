"use client";
import Select from "react-select";
import CurrentShowList from "../data/CurrentShowList.json";

const ShowSelect = () => {
  let selectOptions = CurrentShowList.map((show) => {
    return {
      label: show.name,
      value: show.id,
    };
  });

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className="grow my-3 mx-1">
        <Select
          maxMenuHeight={500}
          placeholder={"Select A Show"}
          isSearchable={false}
          options={selectOptions}
          instanceId={"ShowSelect"}
        />
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default ShowSelect;
