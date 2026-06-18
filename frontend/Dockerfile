FROM node:22-alpine

WORKDIR /usr/src/frontend

# Ajusta explicitamente o dono da pasta de trabalho para o usuário node
RUN chown node:node /usr/src/frontend

# Copia os arquivos de configuração com o dono correto
COPY --chown=node:node package*.json ./

# Muda para um usuário seguro 
USER node

RUN npm ci --ignore-scripts \
    && mkdir -p node_modules/.cache \
    && chmod 755 node_modules/.cache

# Copia o restante do código fonte
COPY --chown=node:node src/ ./src/
COPY --chown=node:node public/ ./public/

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start"]