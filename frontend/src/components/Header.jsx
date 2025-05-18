import React from 'react'
import logo from '../../logos/logo_semfundo.png'

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo da PV Tech Solutions" className="logo" />
        <nav className="nav" aria-label="Navegação principal">
          <ul className="nav-list">
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href="#contato" className="btn-orcamento">Orçamento</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
