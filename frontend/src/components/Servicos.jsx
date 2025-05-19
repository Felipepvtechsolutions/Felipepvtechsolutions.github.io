import React from 'react';


const servicos = [
  
  
  { img: '/logos/GESTAO.png', title: 'Gestão de TI' }, 

  { img: '/logos/seguranca.png', title: 'Segurança da Informação' }, 

  { img: '/logos/analise.png', title: 'Desenvolvimento & Análise de Dados' } 

];

export default function Servicos() {
  return (
    <section id="servicos" className="section servicos" aria-label="Seção de serviços oferecidos">
      <h2>O que é abordado em <span>nossos serviços?</span></h2>
      <div className="lista-servicos">
        {servicos.map((s) => (
          <div key={s.title} className="item">
            
            <img src={s.img} alt={`Ícone de ${s.title}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
