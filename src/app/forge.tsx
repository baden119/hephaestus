"use client";
import { useState, useEffect } from "react";
import { PbsTrack, PbsEpisode } from "@/utils/interfaces";
import axios from "axios";
import spotifyApi from "@/lib/spotify";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";
import Stf01 from "@/components/state_test_facility/Stf01";
import Stf02 from "@/components/state_test_facility/Stf02";

//TODO proper typing for sessionData
export const Forge = ({ sessionData }: any) => {
  const [tableDisplayState, setTableDisplayState] = useState<string | null>(
    null
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [displayName, setDisplayName] = useState<string | null>(null);

  // Selected PBS Show Value
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);

  // Song List
  const [episodeList, setEpisodeList] = useState<PbsEpisode[] | null>(null);

  // Initial State Test Value 01
  const [state_test_value01, setState_test_value01] =
    useState<string>("rocksteady cut");

  // Initial State Test Value 02
  const [state_test_value02, setState_test_value02] =
    useState<string>("Rubadub style");

  // State test component CSS
  const state_test_module_CSS =
    "box-border h-50 w-50 p-10 m-5 border-4 text-lg bg-green-500 rounded-md";

  // When PBS Show is selected, fetch episodes from API and save songlist to state.
  useEffect(() => {
    const fetchSongList = async () => {
      try {
        const { data } = await axios.post<PbsEpisode[]>("/api/pbs", {
          url: selectedShowURL,
        });
        setEpisodeList(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    };
    if (selectedShowURL !== null) {
      fetchSongList();
    }
  }, [selectedShowURL]);

  // Check Session Data prop, set state values.
  useEffect(() => {
    if (sessionData) {
      spotifyApi.setAccessToken(sessionData.token.access_token);
      setLoggedIn(true);
      spotifyApi.getMe().then(
        function (data) {
          if (data.body.display_name) {
            setDisplayName(data.body.display_name);
          }
        },
        function (err) {
          console.error(err);
        }
      );
    } else setLoggedIn(false);
  }, [sessionData]);

  // When SongList is saved into state, display in a table
  useEffect(() => {
    setTableDisplayState("Browse");
  }, [episodeList]);

  // Show Select Callback Function
  const handle_showSelect = (data: string) => {
    setSelectedShowURL(data);
  };
  // State Test component 01 callback function
  const handle_Stf01 = (data: string) => {
    setState_test_value01(data);
  };

  // State Test component 01 callback function
  const handle_Stf02 = (data: string) => {
    setState_test_value02(data);
  };

  const renderSpotifyTest = () => {
    const spotifyTest = () => {
      spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
        function (data) {
          console.log("Artist albums", data.body);
        },
        function (err) {
          console.error(err);
        }
      );
    };

    if (sessionData) {
      return (
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => spotifyTest()}
        >
          Spotify Test
        </button>
      );
    }
  };

  const renderTable = () => {
    if (tableDisplayState === "Browse") {
      return <Browse episodeList={episodeList} />;
    }

    if (tableDisplayState === "Searching") {
      return <Searching />;
    }

    if (tableDisplayState === "Completed") {
      return <Completed />;
    }
  };

  // const apiTestFetch = async () => {
  //   // const res = await fetch("/api/dragon/");
  //   // const clubMsg = await res.json();
  //   // console.log(clubMsg);
  //   try {
  //     const { data, status } = await axios.get<{ data: { message: string } }>(
  //       "/api/dragon/"
  //     );
  //     console.log(data);
  //     console.log("response status is: ", status);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("error message: ", error.message);
  //       return error.message;
  //     } else {
  //       console.log("unexpected error: ", error);
  //       return "An unexpected error occurred";
  //     }
  //   }
  // };

  // const apiTestPost = async () => {
  //   try {
  //     const { data, status } = await axios.post<{ data: { message: string } }>(
  //       "/api/dragon",
  //       { package: "got that WMD" }
  //     );
  //     console.log(data);
  //     console.log("response status is: ", status);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("error message: ", error.message);
  //       return error.message;
  //     } else {
  //       console.log("unexpected error: ", error);
  //       return "An unexpected error occurred";
  //     }
  //   }
  // };

  return (
    <div className="bg-babyPink min-h-screen">
      <Header displayName={displayName} loggedIn={loggedIn} />
      <ShowSelect loggedIn={loggedIn} callback={handle_showSelect} />
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple  hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Browse")}
        >
          Browse
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Searching")}
        >
          Searching
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Completed")}
        >
          Completed
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setLoggedIn(!loggedIn)}
        >
          Toggle User
        </button>
        {renderSpotifyTest()}
      </div>
      {/* Render Table */}
      <div className="text-center text-xl">{tableDisplayState}</div>
      {renderTable()}
      <div className="container mx-auto flex">
        <Stf01
          CSS_input={state_test_module_CSS}
          value01={state_test_value01}
          onDataFromChild={handle_Stf01}
        />
        <Stf02
          CSS_input={state_test_module_CSS}
          value02={state_test_value02}
          onDataFromChild={handle_Stf02}
        />
      </div>
    </div>
  );
};
