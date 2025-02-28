"use client";
import { useState, useEffect } from "react";
import { PbsEpisode } from "@/utils/interfaces";
import axios from "axios";
import spotifyApi from "@/lib/spotify";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import SpotifySearch from "@/components/SpotifySearch";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";
import PlaylistSaver from "@/components/PlaylistSaver";

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
  const [playlistName, setPlaylistName] = useState("");
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);
  const [selectedShowName, setSelectedShowName] = useState<string | null>(null);
  const [searchPercentage, setSearchPercentage] = useState<number>(0);

  // When PBS Show is selected, fetch episodes from API and save songlist to state.
  useEffect(() => {
    setSearchResults(null);
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
    setTableDisplayState("Browse");
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
      // TODO maybe reset some state values here?
    } else setLoggedIn(false);
  }, [sessionData]);

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

  const handle_PlaylistSaverCallback = () => {
    console.log("Data recieved from Playlist Saver component...");
  };

  // Component Rendering
  const renderSpotifySearch = () => {
    if (loggedIn && episodeList && !searchResults) {
      return (
        <div>
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

  const renderPlaylistSaver = () => {
    if (searchResults && searchPercentage === 100) {
      return (
        <div>
          <PlaylistSaver
            searchResults={searchResults}
            spotifyApi={spotifyApi}
            playlistSaverCallback={handle_PlaylistSaverCallback}
            pbsShowName={selectedShowName}
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
      {renderSpotifySearch()}
      {renderPlaylistSaver()}
      {renderTable()}
    </div>
  );
};
