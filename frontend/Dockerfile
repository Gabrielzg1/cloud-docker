# Use a imagem Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia todo o código do projeto para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta 4200, que é usada pelo Angular CLI por padrão
EXPOSE 4200

# Comando para rodar o Angular (equivalente ao "ng serve")
CMD ["ng", "serve", "--host", "0.0.0.0"]
