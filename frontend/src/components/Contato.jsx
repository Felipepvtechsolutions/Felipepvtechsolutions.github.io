import React, { useState, useEffect } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '', email: '', whatsapp: '', assunto: '',
    pais_do_usuario: '', regiao_do_usuario: '', cidade_do_usuario: ''
  });
  // Estado para exibir mensagens de status (sucesso ou erro)
  const [statusMessage, setStatusMessage] = useState('');

  // Este useEffect busca a localização do usuário com base no IP
  // Ele preenche os campos de localização no formData
  useEffect(() => {
    // Verifica se estamos no navegador antes de tentar fetch (para evitar erros em SSR)
    if (typeof window !== 'undefined') {
      // Mantém a requisição para ipapi.co, pois ela busca o IP do cliente, não do servidor
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setFormData(fd => ({
            ...fd,
            pais_do_usuario: data.country_name,
            regiao_do_usuario: data.region,
            cidade_do_usuario: data.city
          }));
        })
        .catch(error => {
          console.error("Erro ao buscar dados de IP:", error);
          // Opcional: Definir uma mensagem de erro para o usuário se a busca de IP falhar
          // setStatusMessage('Não foi possível obter sua localização.');
        });
    }
  }, []); // O array vazio garante que este efeito rode apenas uma vez ao montar o componente

  // Função para formatar o número de telefone (DDD)XXXXX-XXXX
  const formatPhoneNumber = (value) => {
    // Remove tudo que não for dígito
    let cleanedValue = value.replace(/\D/g, '');

    // Aplica a máscara
    if (cleanedValue.length > 0) {
      cleanedValue = '(' + cleanedValue;
      if (cleanedValue.length > 3) {
        cleanedValue = cleanedValue.substring(0, 3) + ')' + cleanedValue.substring(3);
      }
      if (cleanedValue.length > 9) { // Para números 9xxxx-xxxx ou 8xxxx-xxxx
          // Verifica se é um número de 9 dígitos (celular com 9 na frente)
          if (cleanedValue.length > 10 && cleanedValue[5] === '9') {
              cleanedValue = cleanedValue.substring(0, 10) + '-' + cleanedValue.substring(10, 14);
          } else { // Para números de 8 dígitos
              cleanedValue = cleanedValue.substring(0, 9) + '-' + cleanedValue.substring(9, 13);
          }
      }
        if (cleanedValue.length > 15) { // Limita o tamanho máximo
            cleanedValue = cleanedValue.substring(0, 15);
        }
    }
    return cleanedValue;
  };


  // Lida com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'whatsapp') {
      // Se for o campo whatsapp, formata o valor antes de atualizar o estado
      const formattedValue = formatPhoneNumber(value);
      setFormData(fd => ({ ...fd, [name]: formattedValue }));
    } else {
      // Para outros campos, atualiza o estado normalmente
      setFormData(fd => ({ ...fd, [name]: value }));
    }
      // Limpa a mensagem de status ao começar a digitar novamente
      setStatusMessage('');
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Enviando mensagem...'); // Mensagem de status durante o envio

    try {
      // Envia os dados do formulário para o backend Flask no endpoint /contato
      // Usa a variável de ambiente VITE_BACKEND_URL para obter a URL base do backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL; // <--- Obtém a URL do backend da variável de ambiente

      if (!backendUrl) {
        console.error('VITE_BACKEND_URL não está configurada.');
        setStatusMessage('Erro: URL do backend não configurada.');
        return;
      }

      // Constrói a URL completa do endpoint de contato
      const contactEndpointUrl = `${backendUrl}/contato`; // <--- Constrói a URL completa

      const response = await fetch(contactEndpointUrl, { // <--- Usa a URL completa
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Verifica se a requisição foi bem sucedida (status 2xx)
      if (response.ok) {
        setStatusMessage('Mensagem enviada com sucesso!'); // Mensagem de sucesso
        console.log('Mensagem enviada com sucesso!'); // Log para debug

        // Limpa o formulário após o envio bem sucedido
        setFormData({
          nome: '', email: '', whatsapp: '', assunto: '',
          // Mantém dados de localização se quiser, ou limpa também
          pais_do_usuario: formData.pais_do_usuario,
          regiao_do_usuario: formData.regiao_do_usuario,
          cidade_do_usuario: formData.cidade_do_usuario
        });
      } else {
        // Trata erros de resposta do servidor (ex: status 400, 500)
        const errorData = await response.json(); // Tenta ler a resposta de erro
        const errorMessage = errorData.message || response.statusText || 'Erro desconhecido';
        setStatusMessage(`Erro ao enviar mensagem: ${errorMessage}`); // Mensagem de erro para o usuário
        console.error('Erro ao enviar mensagem:', response.status, errorData);
      }

    } catch (error) {
      // Trata erros de rede ou outros erros durante o fetch
      setStatusMessage('Erro de conexão. Tente novamente mais tarde.'); // Mensagem de erro para o usuário
      console.error('Erro na comunicação com o backend:', error);
    }
  };

  return (
    // Adicionada a classe 'section' para herdar estilos de padding e largura máxima
    <section id="contato" className="section contato" aria-label="Seção de contato">
      {/* Novo contêiner para organizar o formulário e o texto lado a lado */}
      <div className="contato-container">
        <div className="formulario">
          {/* Mantido o título do formulário */}
          <h3>Deixe seu contato</h3>
          {/* Mantido o formulário com os campos e botão */}
          <form onSubmit={handleSubmit}>
            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
            {/* Campo Whatsapp com a máscara */}
            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange} // Usa o handleChange que agora formata
              placeholder="WhatsApp" // Exemplo de placeholder com a máscara
              required
              type="tel" // Use type="tel" para campos de telefone (melhor para mobile)
            />
            <textarea name="assunto" rows="4" value={formData.assunto} onChange={handleChange} placeholder="Assunto" required />
            <button type="submit">Enviar mensagem</button>
          </form>
            {/* Exibir mensagem de status aqui */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>

        {/* Novo div para o conteúdo de texto ao lado do formulário */}
        <div className="contato-info">
          {/* Título grande */}
          <h1>
            VAMOS TRANSFORMAR A<br />
            SUA EMPRESA COM<br />
            <span>TECNOLOGIA DE PONTA?</span>
          </h1>
          {/* Parágrafo de descrição */}
          <p>
            Solicite um orçamento ou entre em contato para que possamos transformar sua<br />
            experiência atual.
          </p>
          {/* Parágrafo sobre as áreas (adaptado da imagem) */}

        </div>
      </div>
    </section>
  );
}
