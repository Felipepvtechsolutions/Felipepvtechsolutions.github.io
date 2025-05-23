# backend/create_zip.py
import os
import zipfile

def create_deployment_package(output_filename='deployment_package.zip', source_dir='.'):
    """
    Cria um arquivo ZIP com o código da aplicação e suas dependências.
    """
    zip_file_path = os.path.join(source_dir, output_filename)
    print(f"Criando pacote de deploy: {zip_file_path}")

    with zipfile.ZipFile(zip_file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        
        zipf.write(os.path.join(source_dir, 'app.py'), 'app.py')
        zipf.write(os.path.join(source_dir, 'lambda_function.py'), 'lambda_handler.py')
        zipf.write(os.path.join(source_dir, 'email_config.py'), 'email_config.py')

        # Adicionar o conteúdo da pasta 'package'
        package_dir = os.path.join(source_dir, 'package')
        if os.path.exists(package_dir) and os.path.isdir(package_dir):
            for root, dirs, files in os.walk(package_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    # O caminho dentro do ZIP deve ser relativo à raiz do pacote
                    arcname = os.path.relpath(file_path, package_dir)
                    zipf.write(file_path, arcname)
                    print(f"Adicionado: {arcname}")
        else:
            print(f"Aviso: Pasta 'package' não encontrada em {package_dir}. Certifique-se de ter rodado 'pip install --target ./package ...'")

    print(f"Pacote de deploy '{output_filename}' criado com sucesso!")

if __name__ == "__main__":
    # Certifique-se de que você está na pasta 'backend' ao rodar este script
    create_deployment_package()
    