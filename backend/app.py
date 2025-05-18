from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from datetime import datetime

app = Flask(__name__)
CORS(app)
CSV_FILE = 'contatos.csv'

@app.route('/contato', methods=['POST'])
def handle_contato():
    data = request.get_json()
    with open(CSV_FILE, mode='a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.utcnow().isoformat(),
            data.get('nome', ''),
            data.get('email', ''),
            data.get('whatsapp', ''),
            data.get('assunto', ''),
            data.get('pais_do_usuario', ''),
            data.get('regiao_do_usuario', ''),
            data.get('cidade_do_usuario', '')
        ])
    return jsonify({'status': 'OK'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)