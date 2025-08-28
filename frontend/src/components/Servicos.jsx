import React, { useState } from 'react';
import Modal from './Modal';

const servicos = [
  
  { img: '/logos/GESTAO.png', title: 'Gestão de TI' }, 

  { img: '/logos/seguranca.png', title: 'Segurança da Informação' }, 

  { img: '/logos/analise.png', title: 'Desenvolvimento & Análise de Dados' } 

];

export default function Servicos() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="servicos" className="section servicos" aria-label="Seção de serviços oferecidos">
        <h2>O que é abordado em <span>nossos serviços?</span></h2>
        <div className="lista-servicos">
          {servicos.map((s) => (
            <div 
              key={s.title} 
              className="item"
              onClick={() => handleServiceClick(s.title)}
              style={{ cursor: 'pointer' }}
              title={`Clique para saber mais sobre ${s.title}`}
            >
              
              <img src={s.img} alt={`Ícone de ${s.title}`} />
              <h3 className="service-title">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        service={selectedService} 
      />
    </>
  );
}
