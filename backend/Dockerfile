# Usa uma imagem base Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Exponha a porta em que o aplicativo será executado
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "main.js"]
