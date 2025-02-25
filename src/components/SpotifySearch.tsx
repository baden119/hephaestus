"use client";
import { useState, useEffect } from "react";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";
import SpotifyWebApi from "spotify-web-api-node";

interface SpotifySearch_props {
  // TODO Typing for callback function
  spotifyApi: SpotifyWebApi;
  episodeList: PbsEpisode[] | null;
  searchResultsCallback: any;
  searchPercentageCallback: any;
}

const SpotifySearch = ({
  spotifyApi,
  episodeList,
  searchResultsCallback,
  searchPercentageCallback,
}: SpotifySearch_props) => {
  const [searchPercentage, setSearchPercentage] = useState(0);
  const [searchResults, setSearchResults] = useState<PbsEpisode[]>([]);

  // Search Percentage Callback
  useEffect(() => {
    searchPercentageCallback(searchPercentage);
  }, [searchPercentage]);

  // SongList Callback
  useEffect(() => {
    if (searchPercentage === 100) {
      searchResultsCallback(searchResults);
    }
  }, [searchPercentage]);

  // Modifys track and artist string data recieved from the PBS API, helps Spotify API search accuracy.
  const modifyInputString = (inputString: string) => {
    if (inputString) {
      inputString = inputString.substring(0, 15);
      inputString = inputString.split("[")[0];
      inputString = inputString.split("-")[0];
      inputString = inputString.split("(")[0];
      inputString = inputString.split("ft.")[0];
      inputString = inputString.split("feat.")[0];
      inputString = inputString.split("feat")[0];
      inputString = inputString.split("FT")[0];
      inputString = inputString.split("Ft.")[0];
      inputString = inputString.replace(/[^a-zA-Z\s,&]/g, "");
      // below is specific for RadioCity Show. Might mess up others...
      inputString = inputString.replace(/^\d+\.\s*/, "");
      inputString = inputString.replace(/\s*-\s*$/, "");
      return inputString;
    } else return;
  };

  const updateSearchPercentage = (percentageDone: number, total: number) => {
    const newCount = Math.round((percentageDone / total) * 100);
    setSearchPercentage(newCount);
  };
  const testSpotifySearch = async () => {
    const trackList: PbsTrack[] = [];

    // Parsing trackList out of episodeList
    episodeList?.forEach((episode, index) => {
      if (index < 4) {
        episode.trackList?.forEach((track) => {
          trackList.push({
            id: track.id,
            artist: track.artist,
            title: track.title,
          });
        });
      }
    });

    // Testing spotify search
    let trackListWithResponses: PbsTrack[] = [];
    const delayTime = 125;
    const searchPromises = trackList.map((track, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            const response = await spotifyApi.searchTracks(
              `track:${modifyInputString(
                track.title
              )} artist:${modifyInputString(track.artist)}`,
              {
                limit: 1,
              }
            );
            if (response.body.tracks?.items[0]) {
              trackListWithResponses.push({
                id: track.id,
                artist: track.artist,
                title: track.title,
                spotify_id: response.body.tracks?.items[0].id,
                spotify_artist: response.body.tracks?.items[0].artists[0].name,
                spotify_title: response.body.tracks?.items[0].name,
              });
              updateSearchPercentage(
                trackListWithResponses.length,
                trackList.length
              );
            } else {
              trackListWithResponses.push(track);
              updateSearchPercentage(
                trackListWithResponses.length,
                trackList.length
              );
            }
          } catch (error) {
            console.error(
              `Error searching for track: ${track.title} | artist:${track.artist} `
            );
          }
          resolve();
        }, index * delayTime);
      });
    });
    await Promise.all(searchPromises);

    // Integrating Responses back into episodeList.
    let episodeListWithResponses: PbsEpisode[] = [];

    episodeList?.forEach((episode) => {
      let episodeWithResponses: PbsEpisode = {
        date: episode.date,
        trackList: [],
      };
      episode.trackList?.forEach((track) => {
        trackListWithResponses.forEach((res_track) => {
          if (res_track.id === track.id) {
            if (res_track.spotify_id) {
              episodeWithResponses.trackList?.push(res_track);
            } else {
              episodeWithResponses.trackList?.push(track);
            }
          }
        });
      });
      if (
        episodeWithResponses.trackList &&
        episodeWithResponses.trackList.length > 0
      ) {
        episodeListWithResponses.push(episodeWithResponses);
      } else {
        episodeListWithResponses.push(episode);
      }
    });
    setSearchResults(episodeListWithResponses);
  };

  if (episodeList)
    return (
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple  hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => testSpotifySearch()}
        >
          SpotifySearch
        </button>
      </div>
    );
};

export default SpotifySearch;
