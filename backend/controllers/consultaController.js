const connection = require("../database.js");

exports.listarConsultasPorMedicoDia = async (req, res) => {
    const { id_medico, id_dia } = req.params;
    try {
        const [results] = await connection.query(
            "SELECT * FROM consulta WHERE id_medico = ? AND id_dia = ?",
            [id_medico, id_dia]
        );
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.criarConsulta = async (req, res) => {
    const { id_medico, id_dia, hora_consulta, paciente, status, observacao } = req.body;
    
    if (!id_medico || !id_dia || !hora_consulta) {
        return res.status(400).json({ message: "ID do Médico, ID do Dia e Hora são obrigatórios" });
    }

    try {
        const nomePaciente = paciente !== undefined ? paciente : '';
        const statusConsulta = status !== undefined ? status : 'DISPONÍVEL';
        const obsConsulta = observacao !== undefined ? observacao : '';

        const [results] = await connection.query(
            "INSERT INTO consulta (id_medico, id_dia, hora_consulta, paciente, status, observacao) VALUES (?, ?, ?, ?, ?, ?)",
            [id_medico, id_dia, hora_consulta, nomePaciente, statusConsulta, obsConsulta]
        );
        res.status(201).json({
            message: "Consulta criada com sucesso",
            id: results.insertId,
        });
    } catch (err) {
        console.error("ERRO DETALHADO NO CATCH AO CRIAR CONSULTA:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Este horário já está agendado." });
        }
        res.status(500).json({ message: 'Ocorreu um erro interno ao processar seu cadastro.' });
    }
};

exports.deletarConsulta = async (req, res) => {
    const { id_consulta } = req.params;
    try {
        const [results] = await connection.query("DELETE FROM consulta WHERE id_consulta = ?", [id_consulta]);
        if (results.affectedRows === 0) return res.status(404).json({ message: "Consulta não encontrada!" });
        res.status(200).json({ message: "Consulta excluída com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.atualizarConsulta = async (req, res) => {
    console.log("\n\n--- INÍCIO DA REQUISIÇÃO PUT /consultas/:id_consulta ---");
    
    const { id_consulta } = req.params;
    const camposParaAtualizar = req.body;

    console.log(`ID da consulta recebido nos parâmetros: ${id_consulta}`);
    console.log("Corpo (body) da requisição recebido:", camposParaAtualizar);

    if (Object.keys(camposParaAtualizar).length === 0) {
        console.log("ERRO: Corpo da requisição está vazio. Retornando 400.");
        return res.status(400).json({ message: "Nenhum dado fornecido para atualização." });
    }

    const setClauses = [];
    const values = [];

    for (const campo in camposParaAtualizar) {
        if (Object.prototype.hasOwnProperty.call(camposParaAtualizar, campo)) {
            setClauses.push(`${campo} = ?`);
            values.push(camposParaAtualizar[campo]);
        }
    }
    
    console.log("Cláusulas SET montadas:", setClauses);

    if (setClauses.length === 0) {
        console.log("ERRO: Nenhuma cláusula de atualização foi montada. Retornando 400.");
        return res.status(400).json({ message: "Nenhum campo válido para atualização." });
    }

    values.push(id_consulta);

    const query = `UPDATE consulta SET ${setClauses.join(", ")} WHERE id_consulta = ?`;

    console.log("QUERY FINAL MONTADA:", query);
    console.log("VALORES PARA A QUERY:", values);
    console.log("--- TENTANDO EXECUTAR A QUERY NO BANCO... ---");

    try {
        const [results] = await connection.query(query, values);

        console.log("Resultado da execução da query:", results);

        if (results.affectedRows === 0) {
            console.log("AVISO: A query executou, mas nenhuma linha foi afetada. O id_consulta pode não existir. Retornando 404.");
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }
        
        console.log("SUCESSO: A linha foi atualizada. Retornando 200.");
        res.status(200).json({ message: 'Consulta atualizada com sucesso!' });

    } catch (err) {
        console.error("!!! ERRO CRÍTICO AO EXECUTAR A QUERY:", err);
        res.status(500).json({ message: 'Ocorreu um erro interno ao atualizar a consulta.' });
    }
};