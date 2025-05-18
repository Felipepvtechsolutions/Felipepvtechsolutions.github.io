import React from 'react';
import soltuion from '../../logos/solutions.png'; // Assumindo que este é o caminho correto para a imagem 'solution'

export default function Sobre() {
  return (
    <section id="sobre" className="section sobre-nos">
      <div className="texto">
        <h2>QUEM <span>SOMOS NÓS</span></h2>
        <p>
          A PV Tech Solutions é uma empresa especializada em soluções de tecnologia da informação.<br /><br /> {/* Quebra de linha aqui */}
          Nosso compromisso é impulsionar negócios através da tecnologia, garantindo maior <strong>produtividade, segurança e competitividade</strong> para nossos clientes.<br /><br /> {/* Quebra de linha aqui */}
          Desenvolvemos soluções personalizadas em <em>software, infraestrutura, segurança cibernética e serviços em nuvem</em>,<br /> {/* Quebra de linha aqui */}
          sempre alinhados às tendências tecnológicas e às necessidades específicas de cada setor.
        </p>
      </div>
      <div className="imagem">
        
        <img src={soltuion} alt="Solution" />
      </div>
    </section>
  );
}