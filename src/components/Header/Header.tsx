import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-sky-600 flex justify-between items-center h-20 text-3xl text-white p-5 rounded-md font-bold">
      <Link to="/">Word Keeper</Link>
      <Link to="/starred">★ Starred Words</Link>
    </header>
  );
};
