import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  const serviceDetails = {
    'Gestão de TI': {
      icon: '✅',
      title: 'Gestão de TI',
      description: 'Cuidamos da tecnologia para que você foque no seu negócio.',
      content: 'Oferecemos uma gestão de TI inteligente e personalizada, com foco na estabilidade, desempenho e crescimento da sua operação. Atuamos de forma estratégica e prática: da manutenção de servidores e suporte técnico à padronização de processos e automações que reduzem custos e aumentam a produtividade. Não entregamos só suporte, entregamos resultado.'
    },
    'Segurança da Informação': {
      icon: '🔒',
      title: 'Segurança da Informação',
      description: 'Mais do que proteção: confiança digital para o seu negócio.',
      content: 'Implantamos políticas de segurança robustas que previnem falhas, bloqueiam ameaças e garantem a continuidade da operação. Trabalhamos com backup seguro, controle de acessos, auditorias, antivírus corporativo e monitoramento 24/7. A segurança é invisível quando funciona e é exatamente assim que deve ser.'
    },
    'Desenvolvimento & Análise de Dados': {
      icon: '📊',
      title: 'Desenvolvimento & Análise de Dados',
      description: 'Soluções que conectam dados, pessoas e decisões.',
      content: 'Criamos sistemas, integrações e dashboards sob medida que facilitam a leitura dos seus indicadores em tempo real. Automatizamos tarefas repetitivas, organizamos informações dispersas e entregamos visualizações claras para você agir com base em dados não em suposições. Informação certa, na hora certa, no formato certo.'
    }
  };

  const currentService = serviceDetails[service];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <span className="service-icon">{currentService.icon}</span>
          <h2>{currentService.title}</h2>
        </div>
        
        <div className="modal-body">
          <p className="service-description">{currentService.description}</p>
          <p className="service-content">{currentService.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
