const http = require("http");
const fs = require("fs");
const path = require("path");

// Função para servir arquivos HTML
function serveFile(res, filePath) {
	fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Erro interno do servidor");
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(content);
		}
	});
}

// Cria o servidor
const server = http.createServer((req, res) => {
	if (req.url === "/") {
		// Serve o arquivo index.html na rota "/"
		const filePath = path.join(__dirname, "index.html");
		serveFile(res, filePath);
	} else if (req.url === "/form") {
		// Serve o arquivo index-form.html na rota "/form"
		const filePath = path.join(__dirname, "index-post.html");
		serveFile(res, filePath);
	} else {
		// Caso a rota não seja "/" ou "/form", responde com 404
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Página não encontrada");
	}
});

// Define a porta para o servidor
const port = 8080;
server.listen(port, () => {
	console.log(`Servidor rodando em http://192.168.1.10:${port}`);
});
