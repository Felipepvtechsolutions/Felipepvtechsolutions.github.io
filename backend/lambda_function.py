# backend/lambda_function.py

import sys
import os
import json
from io import BytesIO

# Adicione o diretório atual ao sys.path para que o Python encontre app.py
# /var/task é o diretório raiz da sua Lambda.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importe seu aplicativo Flask
# Assumindo que seu Flask app é uma variável chamada 'app' em app.py
from app import app as flask_app

# Importe as classes necessárias do Werkzeug
# Request e Response são as classes WSGI mais comuns para lidar com requisições/respostas.
from werkzeug.wrappers import Request, Response

def lambda_handler(event, context):
    # A API Gateway Proxy Integration já faz grande parte do mapeamento,
    # mas precisamos simular um ambiente WSGI para o Flask.

    # Criar um dicionário de ambiente WSGI
    environ = {}

    # Mapear cabeçalhos HTTP
    headers = event.get('headers', {})
    for key, value in headers.items():
        # Converte o nome do cabeçalho para o formato WSGI (ex: Content-Type -> CONTENT_TYPE, User-Agent -> HTTP_USER_AGENT)
        if key.lower() == 'content-type':
            environ['CONTENT_TYPE'] = value
        elif key.lower() == 'content-length':
            environ['CONTENT_LENGTH'] = value
        else:
            environ[f'HTTP_{key.upper().replace("-", "_")}'] = value

    # Mapear informações da requisição
    environ['REQUEST_METHOD'] = event['httpMethod']
    environ['PATH_INFO'] = event['path']
    environ['QUERY_STRING'] = '&'.join([f"{k}={v}" for k, v in event.get('queryStringParameters', {}).items()]) if event.get('queryStringParameters') else ''
    environ['REMOTE_ADDR'] = event['requestContext']['identity'].get('sourceIp', '127.0.0.1')
    environ['SERVER_NAME'] = headers.get('Host', 'localhost')
    environ['SERVER_PORT'] = headers.get('X-Forwarded-Port', '80')
    environ['wsgi.url_scheme'] = headers.get('X-Forwarded-Proto', 'http')

    # Corpo da requisição
    body = event.get('body', '')
    if event.get('isBase64Encoded', False):
        import base64
        body = base64.b64decode(body).decode('utf-8') # Decodifica se for base64

    environ['wsgi.input'] = BytesIO(body.encode('utf-8')) # Usa BytesIO para o corpo
    environ['wsgi.version'] = (1, 0)
    environ['wsgi.errors'] = sys.stderr
    environ['wsgi.multithread'] = False
    environ['wsgi.run_once'] = True
    environ['wsgi.multiprocess'] = False

    # Variáveis adicionais para Lambda e API Gateway
    environ['lambda.event'] = event
    environ['lambda.context'] = context

    # Função para capturar a resposta WSGI
    response_status = None
    response_headers = []
    response_body_chunks = []

    def start_response(status, headers, exc_info=None):
        nonlocal response_status, response_headers
        response_status = status
        response_headers = headers
        return response_body_chunks.append

    # Chamar o aplicativo Flask
    # O Flask app é um callable WSGI
    flask_response_iterator = flask_app(environ, start_response)

    # Coletar o corpo da resposta
    for chunk in flask_response_iterator:
        response_body_chunks.append(chunk)

    # Construir a resposta para o API Gateway
    status_code = int(response_status.split(' ')[0])
    headers_dict = {name: value for name, value in response_headers}

    # O corpo deve ser uma string ou base64-encoded
    final_body = b''.join(response_body_chunks).decode('utf-8')

    return {
        'statusCode': status_code,
        'headers': headers_dict,
        'body': final_body
        # 'isBase64Encoded': True # Se o seu corpo for binário, defina isso como True
    }