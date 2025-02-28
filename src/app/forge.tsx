"use client";
import { useState, useEffect } from "react";
import { PbsEpisode } from "@/utils/interfaces";
import axios from "axios";
import spotifyApi from "@/lib/spotify";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import SpotifySearch from "@/components/SpotifySearch";
import PlaylistNameForm from "@/components/PlaylistNameForm";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";

// TODO proper typing for sessionData
export const Forge = ({ sessionData }: any) => {
  const [tableDisplayState, setTableDisplayState] = useState<string | null>(
    null
  );
  const [episodeList, setEpisodeList] = useState<PbsEpisode[] | null>(null);
  const [searchResults, setSearchResults] = useState<PbsEpisode[] | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // TODO Is it better to use null or "" for initial string values?
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [playListName, setPlaylistName] = useState("");
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);
  const [selectedShowName, setSelectedShowName] = useState<string | null>(null);
  const [searchPercentage, setSearchPercentage] = useState<number | null>(null);

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
  // TODO Handle expired access token!
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

  // When SongList is saved into state (via ShowSelect component), display in a table.
  useEffect(() => {
    setTableDisplayState("Browse");
  }, [episodeList]);

  // Adjust TableDisplay during and after Spotify Search
  useEffect(() => {
    if (searchPercentage) {
      if (searchPercentage > 0 && searchPercentage < 100) {
        setTableDisplayState("Searching");
      } else if (searchResults && searchPercentage === 100) {
        setTableDisplayState("Completed");
      }
    }
  }, [searchPercentage, searchResults]);

  // Callback Functions
  const handle_showSelect = (data: any) => {
    setSelectedShowURL(data.SelectedShowURL);
    setSelectedShowName(data.SelectedShowName);
  };

  const handle_PlaylistName = (data: string) => {
    setPlaylistName(data);
  };

  const handle_SearchResultsCallback = (data: PbsEpisode[]) => {
    setSearchResults(data);
  };

  const handle_SearchPercentageCallback = (data: number) => {
    setSearchPercentage(data);
  };

  // Component Rendering
  // TODO Render Spotify Search correctly, dont show if search complete, replace with playlist save component.
  const renderSpotifyFunctionality = () => {
    if (loggedIn) {
      return (
        <div>
          <PlaylistNameForm
            pbsShowName={selectedShowName}
            playListNameCallback={handle_PlaylistName}
          />
          <SpotifySearch
            spotifyApi={spotifyApi}
            episodeList={episodeList}
            searchResultsCallback={handle_SearchResultsCallback}
            searchPercentageCallback={handle_SearchPercentageCallback}
          />
        </div>
      );
    }
  };

  const renderTable = () => {
    if (tableDisplayState === "Browse") {
      return <Browse episodeList={episodeList} />;
    }
    if (tableDisplayState === "Searching") {
      return (
        <Searching
          episodeList={episodeList}
          searchPercentage={searchPercentage}
        />
      );
    }
    if (tableDisplayState === "Completed") {
      return <Completed searchResults={searchResults} />;
    }
  };

  return (
    <div className="bg-babyPink min-h-screen">
      <Header displayName={displayName} loggedIn={loggedIn} />
      <ShowSelect ShowSelectCallback={handle_showSelect} />
      {renderSpotifyFunctionality()}
      <div className="text-center text-xl">{tableDisplayState}</div>
      {renderTable()}
    </div>
  );
};
