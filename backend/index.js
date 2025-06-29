require('dotenv').config();
const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/login.js');
const medicoRoutes = require('./routes/medico.js');
const diaAtendimentoRoutes = require('./routes/dia_atendimento.js');
const consultaRoutes = require('./routes/consulta.js');
const artigoRoutes = require('./routes/artigos.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes); 
app.use('/medicos', medicoRoutes);
app.use('/dias', diaAtendimentoRoutes);
app.use('/consultas', consultaRoutes);
app.use('/artigos', artigoRoutes);
app.get('/', (req, res) => {
    res.send('API MedSync está no ar!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
