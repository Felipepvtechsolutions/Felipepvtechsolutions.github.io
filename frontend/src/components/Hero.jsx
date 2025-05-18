import React from 'react'

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Seção principal com chamada">
      <div className="hero-content">
        <h1>
          PV Tech<br />
          <span>Solutions</span>
        </h1>
        <p>Transformando Tecnologia em <strong>Soluções Inteligentes</strong></p>
        <a href="#sobre" className="btn-saiba-mais">Saiba mais</a>
      </div>
    </section>
  )
}
