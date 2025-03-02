require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do middleware (DEVE VIR ANTES das rotas estáticas)
app.use(express.json()); // Permite que o servidor entenda JSON no corpo das requisições
app.use(cors()); // Habilita o CORS para permitir requisições do frontend

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../client/build')));

// Rota de teste para verificar se o backend está rodando
app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

// ⚠️ Rota para servir o React (MANTER APÓS AS ROTAS DA API)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
