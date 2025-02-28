"use client";
import { useState, useEffect } from "react";

interface PlaylistNameForm_props {
  // TODO Typing for callback function
  playListNameCallback: any;
  pbsShowName: string | null;
}

const PlaylistNameForm = ({
  pbsShowName,
  playListNameCallback,
}: PlaylistNameForm_props) => {
  const [playlistName, setPlaylistName] = useState("");

  // Send Playlist name data back to parent component
  useEffect(() => {
    playListNameCallback(playlistName);
  }, [playlistName]);

  // AutoGenerate playlist name when new show is selected by user (via prop data)
  useEffect(() => {
    const generatePlaylistName = () => {
      const todaysDate = () => {
        return new Intl.DateTimeFormat("en-AU", {
          month: "numeric",
          year: "2-digit",
        }).format(new Date());
      };
      return pbsShowName + " | " + todaysDate();
    };

    if (pbsShowName) {
      setPlaylistName(generatePlaylistName());
    }
  }, [pbsShowName]);

  return (
    <div className="flex items-center">
      <div className="hidden w-1/4 md:block"></div>
      {/* TODO Add "Playlist Name" Label */}
      <input
        className="shadow appearance-none border rounded w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="playListNameForm"
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      ></input>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};

export default PlaylistNameForm;
