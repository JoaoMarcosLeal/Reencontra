# Reencontra 🔎

Sistema web para gerenciamento de objetos perdidos e encontrados no campus da UFLA.

## 🎯 Objetivo

Centralizar informações de itens perdidos e encontrados, facilitando a comunicação entre usuários e aumentando as chances de recuperação.

---

## 👥 Integrantes

- Guilherme Alexandre Cunha Silva
- Veronica Rodrigues da Silva França
- João Marcos Leal De Oliveira Lopes Ferreira

---

## 🛠️ Tecnologias

- Backend: Python + FastAPI
- Banco de dados: SQLite
- Autenticação: JWT
- Versionamento: Git/GitHub

---

## ⚙️ Funcionalidades (Sprint 1)

- Cadastro de usuários
- Login com autenticação JWT
- Cadastro de itens perdidos/encontrados
- Listagem de itens
- Algoritmo de match automático entre itens

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/JoaoMarcosLeal/Reencontra.git
cd Reencontra

### 2. Criar ambiente virtual
python -m venv venv

### 3. Ativar o ambiente virtual
Windows (PowerShell)
venv\Scripts\activate
Windows (CMD)
venv\Scripts\activate.bat

### 4. Instalar dependências
pip install -r requirements.txt

### 5. Rodar o servidor
uvicorn src.main:app --reload

📡 Acessar a API
Swagger:
http://127.0.0.1:8000/docs
Por meio dela é possível testar todos os endpoints da aplicação.

🧪 Testes
Para rodar os testes:
pytest

📂 Estrutura do projeto
src/
 ├── main.py              # Inicialização da aplicação
 ├── database.py          # Configuração do banco de dados
 ├── models.py            # Modelos ORM
 ├── auth.py              # Autenticação JWT
 ├── routes/
 │    ├── users.py        # Rotas de usuário
 │    ├── items.py        # Rotas de itens
 ├── services/
 │    ├── match_service.py # Algoritmo de correspondência
tests/
 ├── test_example.py

🔄 Fluxo de Uso
O usuário se registra na plataforma
Realiza login e recebe um token JWT
Cadastra um item como perdido ou encontrado
O sistema executa automaticamente o algoritmo de match
Possíveis correspondências são identificadas

🧠 Algoritmo de Match

O sistema compara automaticamente itens perdidos com itens encontrados com base em:

Categoria
Descrição do item

Quando há correspondência, o sistema registra o possível match para futura notificação.



Este projeto é acadêmico e desenvolvido para fins educacionais.