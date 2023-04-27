import './Header.css';

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">Word Keeper</Link>
      <Link to="/starred">★ Starred Words</Link>
    </header>
  );
};
