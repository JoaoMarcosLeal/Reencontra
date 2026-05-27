# Reencontra 🔎

### Sistema Web de Achados e Perdidos Universitário

O **Reencontra** é uma plataforma centralizada desenvolvida para a comunidade acadêmica da **Universidade Federal de Lavras (UFLA)**. O objetivo é facilitar a recuperação de objetos perdidos no campus através de um sistema inteligente de cruzamento de dados, conectando de forma eficiente quem encontrou um item ao seu respectivo dono via algoritmo de "match" assíncrono.

---

## 👥 Integrantes e Responsabilidades

- **Guilherme Alexandre Cunha Silva**: (Adicionar Função)
- **Veronica Rodrigues da Silva França**: (Adicionar Função)
- **João Marcos Leal De Oliveira Lopes Ferreira**: (Adicionar Função)

---

## 🛠️ Tecnologias (Stack)

O projeto é desenvolvido utilizando as seguintes tecnologias:

- **Frontend:** React.js
- **Backend:** Python + FastAPI
- **Banco de dados:** SQLite
- **Autenticação:** JWT
- **Versionamento:** Git/GitHub

---

## ⚙️ Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Cadastro de itens perdidos/encontrados
- Listagem de itens
- Algoritmo de match automático entre itens

---

## 🚀 Instalação e Execução Local

Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina.

### 1. Pré-requisitos

- Node.js (v18 ou superior)
- Python (3.8 ou superior)
- Git

### 2. Clonando o Repositório

```bash
git clone https://github.com/JoaoMarcosLeal/Reencontra.git
cd Reencontra
```

### 3. Backend - Configuração e Execução

#### 3.1 Criar ambiente virtual

```bash
python -m venv venv
```

#### 3.2 Ativar o ambiente virtual

**Windows (PowerShell):**
```bash
venv\Scripts\activate
```

**Windows (CMD):**
```bash
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

#### 3.3 Instalar dependências

```bash
pip install -r requirements.txt
```

#### 3.4 Rodar o servidor backend

```bash
uvicorn src.main:app --reload
```

#### 3.5 Acessar a API (Swagger)

Após rodar o servidor, acesse a documentação interativa da API em:
```
http://127.0.0.1:8000/docs
```
Por meio dela é possível testar todos os endpoints da aplicação.

### 4. Frontend - Configuração e Execução

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Testes

Para rodar os testes do backend:

```bash
pytest
```

---

## 📂 Estrutura do Projeto

```
Reencontra/
├── src/                          # Backend
│   ├── main.py                   # Inicialização da aplicação
│   ├── database.py               # Configuração do banco de dados
│   ├── models.py                 # Modelos ORM
│   ├── auth.py                   # Autenticação JWT
│   ├── routes/
│   │   ├── users.py              # Rotas de usuário
│   │   └── items.py              # Rotas de itens
│   └── services/
│       └── match_service.py      # Algoritmo de correspondência
├── frontend/                     # Frontend (React.js)
├── tests/
│   └── test_example.py           # Testes do backend
└── requirements.txt              # Dependências do Python
```

---

## 🔄 Fluxo de Uso

1. O usuário se registra na plataforma
2. Realiza login e recebe um token JWT
3. Cadastra um item como **perdido** ou **encontrado**
4. O sistema executa automaticamente o algoritmo de match
5. Possíveis correspondências são identificadas

---

## 🧠 Algoritmo de Match

O sistema compara automaticamente itens perdidos com itens encontrados com base em:

- **Categoria** do item
- **Descrição** do item

Quando há correspondência, o sistema registra o possível match para futura notificação.

---

## 📌 Observação

Este projeto é acadêmico e desenvolvido para fins educacionais.
