FROM node:22-alpine

WORKDIR /app

COPY --chown=root:root --chmod=755 package*.json ./

RUN npm install

COPY --chown=root:root --chmod=755 src/ ./src/
COPY --chown=root:root --chmod=755 public/ ./public/
COPY --chown=root:root --chmod=755 README.md ./

USER node

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start"]