const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a conexão com MySQL

// Listar todas as viaturas do banco de dados
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM viaturas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter uma viatura por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM viaturas WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Viatura não encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Adicionar uma nova viatura ao banco de dados
router.post('/', async (req, res) => {
    try {
        const { modelo, ano } = req.body;
        const [result] = await db.query("INSERT INTO viaturas (modelo, ano) VALUES (?, ?)", [modelo, ano]);
        res.status(201).json({ id: result.insertId, modelo, ano });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar uma viatura
router.delete('/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM viaturas WHERE id = ?", [req.params.id]);
        res.json({ message: 'Viatura removida' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
