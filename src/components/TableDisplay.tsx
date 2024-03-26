import DemoPlayList from '../data/DemoEpisodeData.json';

const CreateDate = (date: string) => {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  }).format(new Date(date));
};
const cellStyle = 'p-1 border border-purple-400';

const TableDisplay = () => {
  return (
    <div className='flex justify-between'>
      <div className='hidden w-1/4 md:block'></div>
      <table className='table-auto border-collapse border border-purple-400'>
        <thead>
          <tr>
            <th className={cellStyle}>Date</th>
            <th className={cellStyle}>Song Info from PBS</th>
          </tr>
        </thead>
        <tbody>
          {DemoPlayList.data.map((song) => {
            return (
              <tr key={song.id} className='even:bg-tableStripe'>
                <td className={cellStyle}>{CreateDate(DemoPlayList.date)}</td>
                <td className={cellStyle}>
                  {song.artist} / {song.track}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='hidden w-1/4 md:block'></div>
    </div>
  );
};
export default TableDisplay;
