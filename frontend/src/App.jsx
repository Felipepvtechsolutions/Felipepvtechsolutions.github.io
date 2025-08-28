// src/App.jsx

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Servicos from './components/Servicos';
import Contato from './components/Contato';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton'; 

function App() {
  return (
    <>
      
      <Header />
      <Hero />
      <Sobre />
      <Servicos />
      <Contato />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
