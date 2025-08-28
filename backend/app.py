from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import smtplib 
from email.mime.text import MIMEText 
import email_config

app = Flask(__name__)
CORS(app)

# --- Função auxiliar para enviar o e-mail com os dados de contato ---
def send_contact_email(data):
    if not email_config.EMAIL_USER or not email_config.EMAIL_PASSWORD or not email_config.EMAIL_RECEIVER or not email_config.SMTP_SERVER:
        print("Erro de configuração de E-mail: Variáveis de ambiente não definidas no arquivo de configuração ou ambiente.")
        return False, "Erro de configuração de E-mail."

    try:
        # --- Formatar Data/Hora Brasil ---
        now_brazil = datetime.now(email_config.BRAZIL_TIMEZONE)
        timestamp_brazil = now_brazil.strftime('%d/%m/%Y %H:%M:%S')

        # --- Construir o corpo do E-mail ---
        body = f"""
        Novo Lead Recebido do Site:

        Data/Hora: {timestamp_brazil}
        Nome: {data.get('nome', 'Não informado')}
        E-mail: {data.get('email', 'Não informado')}
        Whatsapp: {data.get('whatsapp', 'Não informado')}
        Assunto: {data.get('assunto', 'Não informado')}

        --- Informações de Localização (baseado no IP) ---
        País: {data.get('pais_do_usuario', 'Não informado')}
        Região/Estado: {data.get('regiao_do_usuario', 'Não informado')}
        Cidade: {data.get('cidade_do_usuario', 'Não informado')}
        """

        # Cria o objeto MIMEText para a mensagem de e-mail
        msg = MIMEText(body, 'plain', 'utf-8')
        # Define o assunto do e-mail, usando a variável importada
        msg['Subject'] = email_config.EMAIL_SUBJECT
        # Define o remetente (o mesmo usuário usado para login), usando a variável importada
        msg['From'] = email_config.EMAIL_USER
        # Define o destinatário, usando a variável importada
        msg['To'] = email_config.EMAIL_RECEIVER

        # --- Conectar ao servidor SMTP e enviar ---
        with smtplib.SMTP(email_config.SMTP_SERVER, email_config.SMTP_PORT) as server:
            # Inicia a criptografia TLS (Transport Layer Security)
            server.starttls()
            # Faz login no servidor SMTP com as credenciais, usando as variáveis importadas
            server.login(email_config.EMAIL_USER, email_config.EMAIL_PASSWORD)
            # Envia o e-mail
            server.sendmail(email_config.EMAIL_USER, email_config.EMAIL_RECEIVER, msg.as_string())

        # Se chegou até aqui, o e-mail foi enviado com sucesso
        print("E-mail enviado com sucesso!")
        return True, "E-mail enviado com sucesso!"

    except Exception as e:
        print(f"Erro ao enviar E-mail: {e}")
        return False, f"Erro ao enviar E-mail: {e}"

@app.route("/")
def home():
    return "Olá do Flask no Ubuntu 24.04!"


# Define a rota '/contato' que aceita requisições POST
@app.route('/contato', methods=['POST'])
def handle_contato():
    data = request.get_json()

    if not data or not data.get('nome') or not data.get('email') or not data.get('whatsapp') or not data.get('assunto'):
         return jsonify({'status': 'Error', 'message': 'Dados do formulário incompletos.'}), 400

    success, message = send_contact_email(data)

    if success:
        return jsonify({'status': 'OK', 'message': 'Mensagem enviada com sucesso!'}), 200
    else:
        return jsonify({'status': 'Error', 'message': f'Falha ao enviar mensagem: {message}'}), 500


# Bloco principal para executar a aplicação Flask
if __name__ == '__main__':
    # Ao rodar em produção, defina debug=False para desativar o modo de debug
    # Para testar localmente, debug=True é útil para ver erros detalhados
    # Certifique-se de que as variáveis de ambiente EMAIL_USER, EMAIL_PASSWORD, etc.,
    # estão definidas no ambiente onde você executa este script.
    app.run(debug=True, port=6000) # Roda a aplicação na porta 5000
