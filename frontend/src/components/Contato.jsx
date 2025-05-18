import React, { useState, useEffect } from 'react'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '', email: '', whatsapp: '', assunto: '',
    pais_do_usuario: '', regiao_do_usuario: '', cidade_do_usuario: ''
  })

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setFormData(fd => ({
          ...fd,
          pais_do_usuario: data.country_name,
          regiao_do_usuario: data.region,
          cidade_do_usuario: data.city
        }))
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(fd => ({ ...fd, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    alert('Mensagem enviada com sucesso!')
    setFormData({ nome: '', email: '', whatsapp: '', assunto: '', pais_do_usuario: '', regiao_do_usuario: '', cidade_do_usuario: '' })
  }

  return (
    <section id="contato" className="contato">
      <div className="formulario">
        <h3>Deixe seu contato</h3>
        <form onSubmit={handleSubmit}>
          <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
          <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Whatsapp" required />
          <textarea name="assunto" rows="4" value={formData.assunto} onChange={handleChange} placeholder="Assunto" required />
          <button type="submit">Enviar mensagem</button>
        </form>
      </div>
    </section>
  )
}