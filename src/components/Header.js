import React from 'react';

import '../styles/Header.css';

const Header = () => {
  return (
    <header onClick={() => window.scroll(0, 0)} className="header">
      🎬 Entertainment Hub 🎥
    </header>
  );
};

export default Header;