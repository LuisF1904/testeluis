require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Permite que o servidor entenda JSON no corpo das requisições
app.use(cors()); // Habilita o CORS para permitir requisições do frontend

// ⚠️ Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',    // Se necessário, altere para seu host do MySQL
    user: 'root',         // Altere se o usuário for diferente
    password: '',         // Se houver senha, adicione aqui
    database: 'projeto'   // Certifique-se de que este é o nome do seu banco de dados
});

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// ✅ Rota para buscar viaturas do banco de dados
app.get("/api/viaturas", (req, res) => {
    const sql = "SELECT * FROM viaturas"; // Substitua 'viaturas' pelo nome real da tabela, se for diferente
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar viaturas:", err);
            res.status(500).json({ error: "Erro ao buscar viaturas" });
            return;
        }
        res.json(results);
    });
});

// Rota de teste para verificar se o backend está rodando
app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

// ⚠️ Servir arquivos estáticos do React APÓS as rotas da API
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
