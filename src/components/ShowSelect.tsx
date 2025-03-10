"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import CurrentShows from "../data/currentShows.json";

interface ShowSelect_props {
  // TODO Typing for callback function
  ShowSelectCallback: any;
}

const ShowSelect = ({ ShowSelectCallback }: ShowSelect_props) => {
  const [episodeCount, setEpisodeCount] = useState(5);
  const [selectedShowName, setSelectedShowName] = useState("");
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);
  const [selectedShowDescription, setSelectedShowDescription] = useState("");

  useEffect(() => {
    ShowSelectCallback({
      episodeCount: episodeCount,
      selectedShowURL: selectedShowURL,
      selectedShowName: selectedShowName,
      selectedShowDescription: selectedShowDescription,

      // episodeCount,
      // selectedShowURL,
      // selectedShowName,
      // selectedShowDescription,
    });
  }, [selectedShowName, episodeCount]);

  let selectOptions = CurrentShows.map((show, index) => {
    return {
      label: show.name,
      value: index,
      url: show.programRestUrl,
      description: show.gridDescription,
    };
  });

  const episodCountOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const handleShowSelect = (e: any) => {
    setSelectedShowName(e.label);
    setSelectedShowURL(e.url);
    setSelectedShowDescription(e.description);
  };

  const handleEpisodeSelect = (e: any) => {
    setEpisodeCount(e.value);
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
          onChange={handleShowSelect}
        />
      </div>
      <div className="shrink my-3 mx-1">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="episodeCountSelect"
        >
          Episodes
        </label>
        <Select
          maxMenuHeight={500}
          defaultValue={episodCountOptions[episodeCount - 1]}
          isSearchable={false}
          options={episodCountOptions}
          instanceId={"episodeCountSelect"}
          onChange={handleEpisodeSelect}
        />
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default ShowSelect;
