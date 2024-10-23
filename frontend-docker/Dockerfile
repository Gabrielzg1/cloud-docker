# Use uma imagem base oficial do Node.js
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 8080

# Defina o comando de inicialização
CMD ["npm", "serve"]