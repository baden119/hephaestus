import { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { Unbounded } from "next/font/google";
import { PbsEpisode } from "@/utils/interfaces";
import SpotifyWebApi from "spotify-web-api-node";

interface PlaylistSaver_props {
  // TODO Typing for callback function
  searchResults: PbsEpisode[] | null;
  spotifyApi: SpotifyWebApi;
  pbsShowName: string | null;
  playlistSaverCallback: any;
}

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

const PlaylistSaver = ({
  searchResults,
  spotifyApi,
  pbsShowName,
  playlistSaverCallback,
}: PlaylistSaver_props) => {
  const [playlistName, setPlaylistName] = useState("");

  // AutoGenerate playlist name when new show is selected by user (via prop data)
  useEffect(() => {
    const generatePlaylistName = () => {
      const todaysDate = () => {
        return new Intl.DateTimeFormat("en-AU", {
          month: "long",
          year: "numeric",
        }).format(new Date());
      };
      return "[PBS] " + pbsShowName + " | " + todaysDate();
    };

    if (pbsShowName) {
      setPlaylistName(generatePlaylistName());
    }
  }, [pbsShowName]);
  const savePlaylist = async () => {
    const spotifyIDs: string[] = [];

    // Parse Spotify IDs out of searchResults array
    searchResults?.forEach((episode) => {
      episode.trackList?.forEach((track) => {
        if (track.spotify_id) {
          spotifyIDs.push(`spotify:track:${track.spotify_id}`);
        }
      });
    });

    // Use Spotify IDs to create a playlist.
    // TODO functionality for long ID Lists.
    try {
      const createResponse = await spotifyApi.createPlaylist(playlistName, {
        description: "Created By Pbspotify",
        public: true,
      });
      const newPlaylistID = createResponse.body.id;
      const populateResponse = await spotifyApi.addTracksToPlaylist(
        newPlaylistID,
        spotifyIDs
      );
      console.log(populateResponse.body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="hidden w-1/4 md:block"></div>
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="playlistNameForm"
          >
            Playlist Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playlistNameForm"
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          ></input>
        </div>
        <div className="hidden w-1/4 md:block"></div>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => savePlaylist()}
        >
          <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
          <div className={`${unbounded.className}`}>Save Playlist</div>
        </button>
      </div>
    </div>
  );
};

export default PlaylistSaver;
