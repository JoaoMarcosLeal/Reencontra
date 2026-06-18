# Reencontra 🔎

## Sistema Web de Achados e Perdidos Universitário

O **Reencontra** é uma plataforma centralizada desenvolvida para a comunidade acadêmica da **Universidade Federal de Lavras (UFLA)**. O objetivo do sistema é facilitar a recuperação de objetos perdidos dentro do campus por meio de um mecanismo inteligente de cruzamento de dados, conectando usuários que perderam itens àqueles que os encontraram através de um algoritmo de *match* assíncrono.

---

## 👥 Integrantes e Responsabilidades

- **Guilherme Alexandre Cunha Silva**  
- **Veronica Rodrigues da Silva França** 
- **João Marcos Leal de Oliveira Lopes Ferreira** 

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Frontend
- React.js

### Backend
- Python
- FastAPI

### Banco de Dados
- SQLite

### Autenticação
- JWT (JSON Web Token)

### Versionamento
- Git e GitHub

---

## ⚙️ Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Cadastro de itens perdidos e encontrados
- Listagem de itens
- Algoritmo de *match* automático entre itens

---

## 🚀 Instalação e Execução Local

Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina.

### 1. Pré-requisitos

Certifique-se de possuir os seguintes softwares instalados:

- Node.js (v18 ou superior)
- Python (v3.8 ou superior)
- Git
- Docker *(opcional)*

---

## 2. Clonando o Repositório

```bash
git clone https://github.com/JoaoMarcosLeal/Reencontra.git
cd Reencontra
```

---

# OPÇÃO 1 — Executando com Docker

## Subir os containers

```bash
docker compose up -d --build
```

## Parar os containers

```bash
docker compose stop
```

---

# OPÇÃO 2 — Execução Manual

## 3. Backend — Configuração e Execução

### 3.1 Criar ambiente virtual

```bash
python -m venv venv
```

### 3.2 Ativar o ambiente virtual

#### Windows (PowerShell)

```bash
venv\Scripts\activate
```

#### Windows (CMD)

```bash
venv\Scripts\activate.bat
```

#### Linux/macOS

```bash
source venv/bin/activate
```

### 3.3 Instalar dependências

```bash
pip install -r requirements.txt
```

### 3.4 Rodar o servidor backend

```bash
uvicorn src.main:app --reload
```

### 3.5 Acessar a documentação da API

Após iniciar o servidor, acesse:

```txt
http://127.0.0.1:8000/docs
```

Através dessa interface é possível visualizar e testar todos os endpoints da aplicação.

---

## 4. Frontend — Configuração e Execução

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Testes

Para executar os testes do backend:

```bash
pytest
```

---

## 📂 Estrutura do Projeto

```txt
Reencontra/
├── src/                          # Backend
│   ├── main.py                   # Inicialização da aplicação
│   ├── database.py               # Configuração do banco de dados
│   ├── models.py                 # Modelos ORM
│   ├── auth.py                   # Autenticação JWT
│   ├── routes/
│   │   ├── users.py              # Rotas de usuários
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
4. O sistema executa automaticamente o algoritmo de *match*
5. Possíveis correspondências são identificadas

---

## 🧠 Algoritmo de Match

O sistema compara automaticamente itens perdidos com itens encontrados com base em:

- **Categoria** do item
- **Descrição** do item

Quando há correspondência, o sistema registra um possível *match* para futura notificação.

---

## 📌 Observação

Este projeto possui fins acadêmicos e foi desenvolvido para objetivos educacionais.