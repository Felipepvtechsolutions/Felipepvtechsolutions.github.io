import React from 'react'

const servicos = [
  { img: '/gestao_ti.png', title: 'Gestão de TI' },
  { img: '/seguranca_info.png', title: 'Segurança da Informação' },
  { img: '/desenvolvimento_dados.png', title: 'Desenvolvimento & Análise de Dados' }
]

export default function Servicos() {
  return (
    <section id="servicos" className="section servicos" aria-label="Seção de serviços oferecidos">
      <h2>O que é abordado em <span>nossos serviços?</span></h2>
      <div className="lista-servicos">
        {servicos.map((s, idx) => (
          <div key={idx} className="item">
            <img src={s.img} alt={`Ícone de ${s.title}`} />
            <p>{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
