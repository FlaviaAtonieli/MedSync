import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PopupAgendamentoSecretaria from "../components/PopupAgendamentoSecretaria.jsx";
import NewDayPopup from "../components/NewDayPopup.jsx";
import { useMedical } from '../contexts/MedicalContext.jsx';

const Spinner = () => (<div className="flex justify-center items-center h-5 w-5"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div></div>);

const CustomModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar", isWarning = false }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
                <p className="mb-4 text-gray-600 whitespace-pre-wrap">{message}</p>
                <div className="flex justify-end gap-4 mt-4">
                    {cancelText && <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium">{cancelText}</button>}
                    <button onClick={onConfirm} className={`px-4 py-2 rounded-lg text-white font-medium ${isWarning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#008E9A] hover:bg-[#007a85]'}`}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    isWarning: PropTypes.bool
};

function Gerenciamento() {
    const { medicos, artigos, loading, addMedico, updateMedico, deleteMedico, addDiaAtendimento, deleteDia, agendarConsulta, deleteConsulta, updateConsulta, addArtigo, updateArtigo, deleteArtigo } = useMedical();
    
    const [filtro, setFiltro] = useState("");
    const [mostrarFormMedico, setMostrarFormMedico] = useState(false);
    const [editandoMedico, setEditandoMedico] = useState(null);
    const [formMedico, setFormMedico] = useState({ nome: '', crm: '', especializacao: '', notas: '' });
    
    const [showAddDayPopup, setShowAddDayPopup] = useState(false);
    const [showAgendamentoPopup, setShowAgendamentoPopup] = useState(false);
    
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);
    const [consultaParaEditar, setConsultaParaEditar] = useState(null);
    const [diaEmCarregamento, setDiaEmCarregamento] = useState(null);
    
    const [mostrarFormArtigo, setMostrarFormArtigo] = useState(false);
    const [editandoArtigo, setEditandoArtigo] = useState(null);
    const [formArtigo, setFormArtigo] = useState({ titulo: '', resumo: '', conteudo_completo: '', autor: '', data_publicacao: '' });
    
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, isWarning: false });

    const medicosFiltrados = medicos.filter(m => m?.nome?.toLowerCase().includes(filtro.toLowerCase()));

    const showAlert = (message, title = "Aviso") => { setModalState({ isOpen: true, title, message, onConfirm: () => setModalState({ ...modalState, isOpen: false }), cancelText: null, confirmText: "OK", isWarning: false }); };
    const showConfirm = (message, onConfirmAction, title = "Confirmação") => { setModalState({ isOpen: true, title, message, onConfirm: () => { onConfirmAction(); setModalState({ ...modalState, isOpen: false }); }, isWarning: true, cancelText: "Cancelar", confirmText: "Confirmar" }); };

    const handleOpenEditMedicoForm = (medico) => { setEditandoMedico(medico.id); setFormMedico({ nome: medico.nome, crm: medico.crm, especializacao: medico.especializacao, notas: medico.notas || '' }); setMostrarFormMedico(true); };
    const handleOpenAddMedicoForm = () => { setEditandoMedico(null); setFormMedico({ nome: '', crm: '', especializacao: '', notas: '' }); setMostrarFormMedico(true); };
    const handleSaveMedico = async () => { if (!formMedico.nome || !formMedico.crm || !formMedico.especializacao) { showAlert("Nome, CRM e Especialização são obrigatórios."); return; } try { const success = editandoMedico ? await updateMedico(editandoMedico, formMedico) : await addMedico(formMedico); if (success) { setMostrarFormMedico(false); showAlert("Médico salvo com sucesso!", "Sucesso"); } } catch (error) { showAlert(error.message, "Erro"); } };
    const handleDeleteMedico = (medicoId, medicoNome) => showConfirm(`Deseja remover o médico ${medicoNome}?`, async () => { try { await deleteMedico(medicoId); } catch (error) { showAlert(error.message, "Erro"); } });

    const handleAddDiaClick = (medico) => { setMedicoSelecionado(medico); setShowAddDayPopup(true); };
    const handleConfirmAddDay = async (novoDia) => { if (!novoDia.dia || !novoDia.data || !medicoSelecionado) { showAlert("Dia e data são obrigatórios."); return; } const dataFormatada = new Date(novoDia.data).toISOString().split('T')[0]; try { const success = await addDiaAtendimento({ id_medico: medicoSelecionado.id, dia_semana: novoDia.dia, data_atendimento: dataFormatada }); if (success) setShowAddDayPopup(false); } catch (error) { showAlert(error.message, "Erro"); } };
    const handleDeleteDay = (diaId) => showConfirm("Remover este dia e todos os seus horários?", async () => { try { await deleteDia(diaId); } catch (error) { showAlert(error.message, "Erro"); } });
    const handleOpenAgendamentoPopup = (medico, consulta) => { setMedicoSelecionado(medico); setConsultaParaEditar(consulta); setShowAgendamentoPopup(true); };
    const handleConfirmarAgendamento = async (dados) => { if (!consultaParaEditar) { showAlert("Erro inesperado.", "Erro"); return; } if (!dados.nomePaciente) { showAlert("Nome do paciente é obrigatório."); return; } try { const success = await updateConsulta(consultaParaEditar.id, { paciente: dados.nomePaciente, observacao: dados.obsConsulta, status: 'AGENDADA' }); if (success) setShowAgendamentoPopup(false); } catch (error) { showAlert(error.message, "Erro"); } };
    const handleCancelarAgendamento = (consultaId) => showConfirm("Cancelar este agendamento e liberar o horário?", async () => { try { const success = await updateConsulta(consultaId, { paciente: '', status: 'DISPONÍVEL', observacao: 'Agendamento cancelado' }); if (success) setShowAgendamentoPopup(false); } catch (error) { showAlert(error.message, "Erro"); } });
    const handleDeleteHorario = (e, id_consulta) => { e.stopPropagation(); showConfirm("Remover este horário permanentemente?", async () => { try { await deleteConsulta(id_consulta); } catch (error) { showAlert(error.message, "Erro"); } }); };
    const handleAddStandardHours = async (medico, dia) => { const horariosPadrao = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']; const horariosExistentes = dia.horarios.map(h => h.hora.substring(0, 5)); setDiaEmCarregamento(dia.id_dia); try { await Promise.all(horariosPadrao.map(hora => !horariosExistentes.includes(hora) ? agendarConsulta({ id_medico: medico.id, id_dia: dia.id_dia, hora_consulta: hora, paciente: '', status: 'DISPONÍVEL', observacao: '' }) : Promise.resolve())); } catch (error) { showAlert(error.message, "Erro"); } finally { setDiaEmCarregamento(null); } };

    const handleOpenAddArtigoForm = () => { setEditandoArtigo(null); setFormArtigo({ titulo: '', resumo: '', conteudo_completo: '', autor: '', data_publicacao: new Date().toISOString().split('T')[0] }); setMostrarFormArtigo(true); };
    const handleOpenEditArtigoForm = (artigo) => { setEditandoArtigo(artigo.id_artigo); setFormArtigo({ titulo: artigo.titulo, resumo: artigo.resumo, conteudo_completo: artigo.conteudo_completo || '', autor: artigo.autor || '', data_publicacao: new Date(artigo.data_publicacao).toISOString().split('T')[0] }); setMostrarFormArtigo(true); };
    const handleSaveArtigo = async () => { if (!formArtigo.titulo || !formArtigo.resumo || !formArtigo.data_publicacao) { showAlert("Título, resumo e data são obrigatórios."); return; } try { const success = editandoArtigo ? await updateArtigo(editandoArtigo, formArtigo) : await addArtigo(formArtigo); if (success) { setMostrarFormArtigo(false); showAlert("Artigo salvo com sucesso!", "Sucesso"); } } catch (error) { showAlert(error.message, "Erro"); } };
    const handleDeleteArtigo = (artigoId, artigoTitulo) => showConfirm(`Deseja remover o artigo "${artigoTitulo}"?`, async () => { try { await deleteArtigo(artigoId); } catch (error) { showAlert(error.message, "Erro"); } });

    const formatarDataVisual = (dateStr) => { if (!dateStr) return ''; return new Date(dateStr).toLocaleDateString('pt-BR', { timeZone: 'UTC' }); };

    if (loading && medicos.length === 0 && artigos.length === 0) return (<div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50"><Spinner /> <p className="ml-2 text-gray-600">Carregando dados...</p></div>);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 container mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <CustomModal {...modalState} onClose={() => setModalState({ ...modalState, isOpen: false })} />
                {showAgendamentoPopup && <PopupAgendamentoSecretaria isOpen={showAgendamentoPopup} onClose={() => setShowAgendamentoPopup(false)} onConfirm={handleConfirmarAgendamento} onCancelBooking={handleCancelarAgendamento} consulta={consultaParaEditar} />}
                {showAddDayPopup && <NewDayPopup isOpen={showAddDayPopup} onClose={() => setShowAddDayPopup(false)} onConfirm={handleConfirmAddDay} />}

                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#00565e]">Gestão de Horários | Médicos</h1>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <input type="text" placeholder="Buscar médico..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
                            <button onClick={handleOpenAddMedicoForm} className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-4 rounded-lg"> + Médico</button>
                        </div>
                    </div>

                    {mostrarFormMedico && (
                        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-[#00565e] mb-4">{editandoMedico ? "Editar Médico" : "Cadastrar Novo Médico"}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label><input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={formMedico.nome} onChange={(e) => setFormMedico({...formMedico, nome: e.target.value})} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">CRM *</label><input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={formMedico.crm} onChange={(e) => setFormMedico({...formMedico, crm: e.target.value})} /></div>
                                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Especialização *</label><input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={formMedico.especializacao} onChange={(e) => setFormMedico({...formMedico, especializacao: e.target.value})} /></div>
                                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Notas</label><textarea className="w-full border border-gray-300 rounded px-3 py-2" rows="2" value={formMedico.notas} onChange={(e) => setFormMedico({...formMedico, notas: e.target.value})} /></div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setMostrarFormMedico(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg">Cancelar</button><button onClick={handleSaveMedico} className="bg-[#008E9A] text-white px-6 py-2 rounded-lg">{editandoMedico ? "Atualizar" : "Salvar"}</button></div>
                        </div>
                    )}

                    <div className="space-y-8">
                        {medicosFiltrados.length > 0 ? ( medicosFiltrados.map(medico => (
                            <div key={medico.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#008E9A] p-4 text-white flex justify-between items-start flex-wrap gap-2">
                                    <div><h2 className="text-xl font-bold">{medico.nome}</h2><p className="text-sm">CRM: {medico.crm} • {medico.especializacao}</p></div>
                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                        <button onClick={() => handleOpenEditMedicoForm(medico)} title="Editar médico" className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-200">✏️</button>
                                        <button onClick={() => handleDeleteMedico(medico.id, medico.nome)} title="Remover médico" className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-200">🗑️</button>
                                        <button onClick={() => handleAddDiaClick(medico)} className="bg-white text-[#008E9A] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">+ Dia</button>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    {(medico.diasAtendimento && medico.diasAtendimento.length > 0) ? medico.diasAtendimento.map((dia) => (
                                        <div key={dia.id_dia} className="mb-6 last:mb-0">
                                            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                                                <h3 className="text-lg font-semibold text-gray-800">{dia.dia.toUpperCase()} - {formatarDataVisual(dia.data)}</h3>
                                                <div className="flex gap-2 items-center">
                                                    <button onClick={() => handleDeleteDay(dia.id_dia)} title="Remover dia" className="text-gray-400 hover:text-red-500">🗑️</button>
                                                    {diaEmCarregamento === dia.id_dia ? (<Spinner />) : (<button onClick={() => handleAddStandardHours(medico, dia)} className="text-blue-500 text-sm font-medium hover:text-blue-700">Gerar Agenda Padrão</button>)}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {(dia.horarios || []).sort((a, b) => a.hora.localeCompare(b.hora)).map((horario) => (
                                                    <button key={horario.id} onClick={() => handleOpenAgendamentoPopup(medico, horario)} className={`border rounded-lg p-3 relative text-center transition-all ${horario.status === 'AGENDADA' ? 'bg-green-50 border-green-300 hover:shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-teal-50 hover:border-teal-300'}`}>
                                                        <div className="font-bold text-[#00565e] mb-1">{horario.hora.substring(0, 5)}</div>
                                                        {horario.status === 'AGENDADA' ? (<div className="text-xs text-gray-700 truncate" title={horario.paciente}>{horario.paciente}</div>) : (<div className="text-xs text-blue-600 font-semibold">Disponível</div>)}
                                                        <div onClick={(e) => handleDeleteHorario(e, horario.id)} className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-xs opacity-50 hover:opacity-100 p-1 rounded-full">❌</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )) : (<p className="text-center text-gray-500 py-4">Nenhum dia de atendimento cadastrado.</p>)}
                                </div>
                            </div>
                        )) ) : ( <div className="text-center py-10 bg-white rounded-lg shadow-md"><h3 className="text-xl font-semibold text-gray-700">Nenhum médico cadastrado</h3><p className="text-gray-500 mt-2">Clique em <strong>+ Médico</strong> para começar.</p></div> )}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto w-full mt-16">
                    <div className="flex justify-between items-center mb-8"><h1 className="text-2xl sm:text-3xl font-bold text-[#00565e]">Gestão de Informativos</h1><button onClick={handleOpenAddArtigoForm} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">+ Novo Artigo</button></div>
                    {mostrarFormArtigo && (
                        <div className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4"><h2 className="text-xl font-bold text-[#00565e]">{editandoArtigo ? 'Editar Artigo' : 'Criar Novo Artigo'}</h2><input type="text" placeholder="Título" value={formArtigo.titulo} onChange={(e) => setFormArtigo({...formArtigo, titulo: e.target.value})} className="w-full border p-2 rounded-md"/><textarea placeholder="Resumo" value={formArtigo.resumo} onChange={(e) => setFormArtigo({...formArtigo, resumo: e.target.value})} className="w-full border p-2 rounded-md" rows="3"></textarea><input type="text" placeholder="Autor" value={formArtigo.autor} onChange={(e) => setFormArtigo({...formArtigo, autor: e.target.value})} className="w-full border p-2 rounded-md"/><input type="date" value={formArtigo.data_publicacao} onChange={(e) => setFormArtigo({...formArtigo, data_publicacao: e.target.value})} className="w-full border p-2 rounded-md"/><textarea placeholder="Conteúdo completo" value={formArtigo.conteudo_completo} onChange={(e) => setFormArtigo({...formArtigo, conteudo_completo: e.target.value})} className="w-full border p-2 rounded-md" rows="10"></textarea><div className="flex justify-end gap-3"><button onClick={() => setMostrarFormArtigo(false)}>Cancelar</button><button onClick={handleSaveArtigo}>Salvar</button></div></div>
                    )}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden"><table className="min-w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{artigos.map(artigo => (<tr key={artigo.id_artigo}><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{artigo.titulo}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatarDataVisual(artigo.data_publicacao)}</td><td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => handleOpenEditArtigoForm(artigo)} className="text-teal-600 hover:text-teal-900 mr-4">Editar</button><button onClick={() => handleDeleteArtigo(artigo.id_artigo, artigo.titulo)} className="text-red-600 hover:text-red-900">Excluir</button></td></tr>))}</tbody></table></div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Gerenciamento;
