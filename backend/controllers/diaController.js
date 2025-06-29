const connection = require('../database');

exports.listarDiasPorMedico = async (req, res) => {
    const { id_medico } = req.params;
    try {
        const [results] = await connection.query("SELECT * FROM dia_atendimento WHERE id_medico = ?", [id_medico]);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
exports.criarDiaAtendimento = async (req, res) => {
    const { id_medico, dia_semana, data_atendimento } = req.body;
    if (!id_medico || !dia_semana || !data_atendimento) return res.status(400).json({ message: "Campos obrigatórios não preenchidos!" });
    try {
        const [results] = await connection.query("INSERT INTO dia_atendimento (id_medico, dia_semana, data_atendimento) VALUES (?, ?, ?)", [id_medico, dia_semana, data_atendimento]);
        res.status(201).json({ message: "Dia de atendimento criado com sucesso", id_dia: results.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
exports.deletarDiaAtendimento = async (req, res) => {
    const { id_dia } = req.params;
    try {
        const [results] = await connection.query("DELETE FROM dia_atendimento WHERE id_dia = ?", [id_dia]);
        if (results.affectedRows === 0) return res.status(404).json({ message: "Dia de atendimento não encontrado!" });
        res.status(200).json({ message: "Dia de atendimento excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};