FROM node:20.5.0
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

ENTRYPOINT [ "node", "dist/main.js" ]
