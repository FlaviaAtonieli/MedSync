const connection = require("../database.js");

exports.listarMedicoAPI = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM medico");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
exports.criarMedico = async (req, res) => {
    const { nome, crm, especializacao, notas } = req.body;
    if (!nome || !crm || !especializacao) return res.status(400).json({ message: "Nome, CRM e especialização são obrigatórios" });
    try {
        const [results] = await connection.query("INSERT INTO medico (nome, crm, especializacao, notas) VALUES (?, ?, ?, ?)", [nome, crm, especializacao, notas]);
        res.status(201).json({ message: "Médico criado com sucesso", id: results.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
exports.atualizarMedico = async (req, res) => {
    const { id } = req.params;
    const { nome, crm, especializacao, notas } = req.body;
    try {
        const [results] = await connection.query("UPDATE medico SET nome = ?, crm = ?, especializacao = ?, notas = ? WHERE id_medico = ?", [nome, crm, especializacao, notas, id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Médico não encontrado' });
        res.status(200).json({ message: 'Médico atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
exports.deletarMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await connection.query("DELETE FROM medico WHERE id_medico = ?", [id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: "Médico não encontrado" });
        res.status(200).json({ message: "Cadastro do médico excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};