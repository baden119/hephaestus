import DemoPlayList from "../../data/DemoEpisodeData.json";
import { DM_Sans } from "next/font/google";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";

interface browse_module_props {
  episodeList: PbsEpisode[] | null;
}

const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
});

const CreateDate = (date: string) => {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  }).format(new Date(date));
};
const cellStyle = "px-1 border border-purple-400 text-sm md:text-base md:p-1";

const renderRow = (song: PbsTrack, date: string) => {
  return (
    <tr key={song.id} className="even:bg-tableStripe">
      <td className={cellStyle + " text-center"}>{CreateDate(date)}</td>
      <td className={cellStyle}>
        {song.artist} / {song.title}
      </td>
    </tr>
  );
};

const Browse = ({ episodeList }: browse_module_props) => {
  if (episodeList)
    return (
      <div className="flex justify-between">
        <div className="hidden w-1/4 md:block"></div>
        <div className={`${dm_sans.className} grow`}>
          <table className="w-full table-auto border-collapse border border-purple-400">
            <thead>
              <tr>
                <th className={cellStyle}>Date</th>
                <th className={cellStyle}>Song Info from PBS</th>
              </tr>
            </thead>
            <tbody>
              {episodeList.map((episode) => {
                if (episode.trackList) {
                  return episode.trackList.map((song) => {
                    return renderRow(song, episode.date);
                  });
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="hidden w-1/4 md:block"></div>
      </div>
    );
  else return <p>No Data</p>;
};
export default Browse;
