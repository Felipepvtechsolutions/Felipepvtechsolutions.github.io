import React from 'react'
import logo from '../../logos/logo_semfundo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo da PV Tech Solutions" className="footer-logo" />
        <address>
          <p>📞 (17) 99641-6135 | ✉️ contato@pvtechsolutions.com.br</p>
          <p>🕒 Segunda a Sexta - Das 8h às 18h</p>
        </address>
        <p className="footer-copy">&copy; {new Date().getFullYear()} PV Tech Solutions – Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
