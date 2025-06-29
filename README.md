# MedSync 🩺
by Amanda Korczagin & Flavia Antonieli 
<h2>Aplicação WEB 💻</h2>
O projeto aporta a ideia de desenvolver um projeto web de agendamento de consultas em uma clínica pediátrica.<br>
O modelo web prioriza uma interface clara e objetiva, na qual o usuário tem acesso a agenda dos médicos.<br>
O usuário tem a liberdade de escolher o melhor dia e horário que esteja vago para ser atendido pelo médico escolhido.<br>
<br>

Com uma interface intuitiva, o MedSync permitirá: <br>

- Agendar consultas rapidamente
- Gerenciar horários de forma eficiente
- Acesso seguro com autenticação
- Experiência simplificada para médicos e pacientes.

<h2>Tecnologias da Aplicação ⚙</h2>

O projeto explora as seguintes tecnologias
- Protótipo: Figma | https://www.figma.com/design/dXYr0pZcivGla5FqEZlu7M/MedSync?node-id=0-1&t=xuBF85ODqzFKkprE-1
- Gerenciamento e planejamento das atividades: Jira Atlassian | https://medsyncpac.atlassian.net/jira/software/projects/KAN/boards/1
- FrontEnd: React, JavaScript visando uma interface dinâmica e responsiva
- Backend: Node.js, CRUD, leve e eficiente para o nosso desenvolvimento
- Banco de dados: MySQL, adequado para o armazenamento de dados estruturado
- Monolítica: Formato ideal para o nosso projeto, priorizando a simplicidade do desenvolvimento
- Autenticação: JWT (JSON Web Tokens) para segurança, recomendado para autenticação em aplicações web
- Deploy:

<h2>Requisitos 📃</h2>

<h3>Requisitos Funcionais</h3>

✅ Login de secretárias, para autenticação dos usuários <br>
✅ Visualização da agenda dos médicos, por parte do paciente <br>
✅ Possibilidade de adicionar novo médico na agenda <br>
✅ Agendamente de uma consulta na agenda do médico por parte da secretária <br>
✅ Alteração do cadastro de médico <br>
✅ Alteração do agendamento por parte da secretária <br>
✅ Exclusão do agendamento por parte da secretária <br>
✅ Exclusão do cadastro do médico (?) <br>
✅ Confirmação de agendamento (redirecionamento para WhatsApp) <br>
✅ Acesso às informações do médico: agenda, especialização, CRM. <br>
✅ Acesso ao informativo (artigos e noticias) <br>
✅ Criação do post do artigo e notícias <br>
✅ Alteração e exclução de artigos e notícias <br>
✅ Detalhes sobre planos e convênio <br>
✅ Página com mais informações sobre a clínica/equipe 

<h3>Requisitos Não Funcionais</h3>

✅ Proteção de dados sensíveis - Login com chave encriptada <br>
✅ Tempo de resposta rápido para agendamentos e consultas <br>
✅ Atendimento facilitado e retorno de dúvidas (FAQ) <br>
✅ Suporte a múltiplos usuários simultaneamente <br>
✅ Ferramenta para controle de atividades <br>
✅ Interface responsiva <br> 
❌ Implementação CI/CD. 

<h2>Detalhamento 📌</h2>
<h3>Operações CRUD</h3>
Create: Adicionar cadastro de novo médico <br>
Read: Visualização dos pacientes dos horários disponíveis/indisponíveis <br>
Update: Atualizar cadastro do médico <br>
Delete: Deletar cadastro do médico <br>
Delete adicional: Deletar a agendamento do paciente <br>

<h3>Frontend</h3>
Planejamento e execução do protótipo da aplicação no Figma.<br>
Desenvolvimento das telas de login, registro, agendamento e atendimento em React.js. <br>
Integração com a API do backend.<br>

<h3>Backend</h3>
Criação das APIs para autenticação<br>
Agendamento e gerenciamento de perfis com JavaScript <br>
Gerenciamento da agenda<br>
