import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/views/Footer/Footer';

import NavBar from './components/views/NavBar/NavBar';

function App() {
  return (
    <Container>
    <NavBar />
    <Footer />
    </Container>
  );
}

export default App;