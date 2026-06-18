FROM node:22-alpine

WORKDIR /usr/src/frontend

COPY --chown=node:node package*.json ./

RUN npm ci --ignore-scripts \ 
&& mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY --chown=node:node src/ ./src/
COPY --chown=node:node public/ ./public/

USER node

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start"]