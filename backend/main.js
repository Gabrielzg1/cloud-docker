const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
	user: "username",
	host: "db",
	database: "main",
	password: "password",
	port: 5432,
});

app.use(cors());
app.use(express.json());

app.get("/piada", async (req, res) => {
	try {
		const query =
			"SELECT setup, punchline FROM piadas ORDER BY RANDOM() LIMIT 1";
		const result = await pool.query(query);
		console.log("teste");
		if (result.rows.length > 0) {
			const piada = result.rows[0];
			return res.json({ setup: piada.setup, punchline: piada.punchline });
		} else {
			return res.status(404).json({ error: "Nenhuma piada encontrada" });
		}
	} catch (error) {
		console.error("Erro ao obter piada:", error);
		res.status(500).json({ error: "Erro ao obter piada" });
	}
});

// Rota para adicionar uma nova piada
app.post("/piada", async (req, res) => {
	const { setup, punchline } = req.body;

	// Verifica se o corpo da requisição contém os campos necessários
	if (!setup || !punchline) {
		return res
			.status(400)
			.json({ error: "Campo 'setup' e 'punchline' são obrigatórios" });
	}

	try {
		// Consulta para inserir a nova piada no banco de dados
		const query =
			"INSERT INTO piadas (setup, punchline) VALUES ($1, $2) RETURNING *";
		const values = [setup, punchline];
		const result = await pool.query(query, values);

		// Retorna a piada adicionada como resposta da API
		return res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Erro ao adicionar piada:", error);
		res.status(500).json({ error: "Erro ao adicionar piada" });
	}
});

app.listen(port, "0.0.0.0", () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
