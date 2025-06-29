const connection = require("../database.js");

exports.listarArtigos = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM artigos ORDER BY data_publicacao DESC");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar artigos", error: err.message });
    }
};

exports.criarArtigo = async (req, res) => {
    const { titulo, resumo, conteudo_completo, imagem_url, autor, data_publicacao } = req.body;
    if (!titulo || !resumo || !data_publicacao) {
        return res.status(400).json({ message: "Título, resumo e data de publicação são obrigatórios." });
    }
    try {
        const [results] = await connection.query(
            "INSERT INTO artigos (titulo, resumo, conteudo_completo, imagem_url, autor, data_publicacao) VALUES (?, ?, ?, ?, ?, ?)",
            [titulo, resumo, conteudo_completo, imagem_url, autor, data_publicacao]
        );
        res.status(201).json({ message: "Artigo criado com sucesso!", id: results.insertId });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar artigo", error: err.message });
    }
};

exports.atualizarArtigo = async (req, res) => {
    const { id } = req.params;
    const { titulo, resumo, conteudo_completo, imagem_url, autor, data_publicacao } = req.body;
    try {
        const [results] = await connection.query(
            "UPDATE artigos SET titulo = ?, resumo = ?, conteudo_completo = ?, imagem_url = ?, autor = ?, data_publicacao = ? WHERE id_artigo = ?",
            [titulo, resumo, conteudo_completo, imagem_url, autor, data_publicacao, id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: "Artigo não encontrado." });
        res.status(200).json({ message: "Artigo atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar artigo", error: err.message });
    }
};

exports.deletarArtigo = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await connection.query("DELETE FROM artigos WHERE id_artigo = ?", [id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: "Artigo não encontrado." });
        res.status(200).json({ message: "Artigo excluído com sucesso." });
    } catch (err) {
        res.status(500).json({ message: "Erro ao excluir artigo", error: err.message });
    }
};