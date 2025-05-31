// src/components/WhatsAppButton.jsx

import React from 'react';
import './WhatsAppButton.css'; // Importa o CSS específico para este componente

const WhatsAppButton = () => {
  
  const phoneNumber = '5517996416135'; 
  
 
  const message = encodeURIComponent('Olá, gostaria de saber mais sobre os serviços da PVTech Solutions. Poderíamos conversar?');
  
  // Link completo do WhatsApp com número e mensagem pré-definida
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-button"
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Entre em contato via WhatsApp" 
    >
      
      <img 
        src="/whatsapp-logo-thin.svg" 
        alt="Ícone do WhatsApp" 
        loading="lazy" 
      />
    </a>
  );
};

export default WhatsAppButton;