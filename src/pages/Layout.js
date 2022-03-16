import React from 'react';
import Container from '@mui/material/Container';

import MovieProvider from "../store/MovieProvider";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <body className='layout-body'>
        <Container>
          <MovieProvider>
            {children}
          </MovieProvider>
        </Container>
      </body>
      <Footer />
    </>
  );
};

export default Layout;