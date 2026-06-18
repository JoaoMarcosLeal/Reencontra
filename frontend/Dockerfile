FROM node:22-alpine

WORKDIR /usr/src/frontend

COPY --chown=root:root --chmod=755 package*.json ./

RUN npm install --ignore-scripts \ 
&& mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY --chown=root:root --chmod=755 src/ ./src/
COPY --chown=root:root --chmod=755 public/ ./public/

USER node

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start"]