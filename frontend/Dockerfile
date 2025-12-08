FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install || npm install --no-fund --no-audit

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
