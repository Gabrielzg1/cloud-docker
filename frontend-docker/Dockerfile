# Usa uma imagem base Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o código da aplicação para o contêiner
COPY . .

# Expõe a porta usada pelo servidor
EXPOSE 8080

# Comando para iniciar o servidor Node.js
CMD ["node", "main.js"]
