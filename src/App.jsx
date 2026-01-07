import React, { useState, useMemo } from 'react';
// Importando ícones de forma segura
import { 
  ShoppingCart, Calculator, Trash2, PlusCircle, 
  Layers, Cpu, ShieldCheck, Box 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('compras');
  
  // Banco de Dados com os itens principais
  const [inventory, setInventory] = useState([
    { id: 1, desc: "Cabo Prysmian Flex 2,5mm² BRANCO (Fase T)", qty: 100, price: 3.45, cat: "Elétrica" },
    { id: 2, desc: "Cabo Prysmian Flex 2,5mm² PRETO (Fase R)", qty: 100, price: 3.45, cat: "Elétrica" },
    { id: 3, desc: "Caixa de Embutir 4x4 Reforçada Amarela", qty: 25, price: 6.20, cat: "Infra" },
    { id: 4, desc: "Torneira Cozinha Gourmet Docol", qty: 1, price: 890.00, cat: "Hidráulica" }
  ]);

  // Cálculo de total automático
  const grandTotal = useMemo(() => {
    return inventory.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
  }, [inventory]);

  // FUNÇÃO: ADICIONAR NO TOPO
  const addRow = () => {
    const newItem = {
      id: Date.now(),
      desc: "Novo Item de Engenharia",
      qty: 0,
      price: 0,
      cat: "Geral"
    };
    setInventory([newItem, ...inventory]);
  };

  const updateItem = (id, key, value) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, [key]: value } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER EXECUTIVO */}
        <header className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl mb-8 border-b-8 border-blue-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-blue-500" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Projeto AP 2209</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Engineering Dash</h1>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 min-w-[280px] text-right">
            <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Investimento Total</p>
            <p className="text-3xl font-mono font-bold text-white">
              R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </header>

        {/* NAVEGAÇÃO ENTRE ABAS */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'compras', icon: <ShoppingCart size={18}/>, label: 'Planilha' },
            { id: 'tecnico', icon: <Calculator size={18}/>, label: 'Metragem' },
            { id: 'mapa', icon: <Cpu size={18}/>, label: 'Crimpagem' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-slate-400 shadow-sm'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 border border-slate-200">
          
          {activeTab === 'compras' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black uppercase text-slate-800 flex items-center gap-3">
                  <Layers className="text-blue-600"/> Gestão de Suprimentos
                </h2>
                <button onClick={addRow} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md">
                  <PlusCircle size={20}/> ADICIONAR NO TOPO
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-[10px] font-black uppercase text-slate-400">
                      <th className="p-4">Descrição do Material</th>
                      <th className="p-4 text-center">Quantidade</th>
                      <th className="p-4 text-center">R$ Unitário</th>
                      <th className="p-4 text-center text-blue-600">Subtotal</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="bg-slate-50 hover:bg-white transition-all shadow-sm group">
                        <td className="p-4 rounded-l-2xl border-l-4 border-transparent group-hover:border-blue-500">
                          <input 
                            className="font-bold text-sm bg-transparent outline-none w-full focus:text-blue-600" 
                            value={item.desc} 
                            onChange={(e) => updateItem(item.id, 'desc', e.target.value)} 
                          />
                          <span className="text-[9px] font-bold text-slate-400 block uppercase mt-1">{item.cat}</span>
                        </td>
                        <td className="p-4 w-28">
                          <input 
                            type="number" 
                            className="w-full text-center bg-white border border-slate-200 rounded-lg p-2 font-bold shadow-inner" 
                            value={item.qty} 
                            onChange={(e) => updateItem(item.id, 'qty', e.target.value)} 
                          />
                        </td>
                        <td className="p-4 w-28">
                          <input 
                            type="number" 
                            className="w-full text-center bg-white border border-slate-200 rounded-lg p-2 font-bold shadow-inner" 
                            value={item.price} 
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)} 
                          />
                        </td>
                        <td className="p-4 text-center font-mono font-black text-blue-700 text-lg">
                          R$ {(item.qty * item.price).toFixed(2)}
                        </td>
                        <td className="p-4 rounded-r-2xl text-center">
                          <button 
                            onClick={() => setInventory(inventory.filter(i => i.id !== item.id))} 
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tecnico' && (
            <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] border-l-8 border-blue-500 shadow-lg">
                <h3 className="text-2xl font-black italic mb-6 text-blue-400 uppercase tracking-tighter">Dimensionamento Elétrico</h3>
                <div className="space-y-4 font-mono text-sm">
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>Fase T (BRANCO)</span><span className="text-blue-400">144m</span></div>
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>Fase R (PRETO)</span><span className="text-blue-400">96m</span></div>
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>Fase S (VERMELHO)</span><span className="text-blue-400">108m</span></div>
                </div>
              </div>
              <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100">
                 <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-slate-800 italic uppercase">
                   <Box className="text-blue-600"/> Padrão 4x4
                 </h3>
                 <p className="text-xs text-slate-600 font-bold leading-relaxed">
                   O uso de caixas 4x4 amarelas reforçadas é mandatório no AP 2209 para garantir o raio de curvatura dos cabos Prysmian 2,5mm² e a acomodação dos terminais ilhós tubulares.
                 </p>
              </div>
            </div>
          )}

          {activeTab === 'mapa' && (
            <div className="bg-slate-50 p-8 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
               <h3 className="text-3xl font-black italic mb-10 text-slate-800 uppercase tracking-tighter">Mapa de Conexão</h3>
               <div className="grid md:grid-cols-3 gap-6 mb-10 text-xs font-black">
                  <div className="bg-black text-white p-8 rounded-3xl shadow-xl">R: PRETO (Fase 1)</div>
                  <div className="bg-red-600 text-white p-8 rounded-3xl shadow-xl">S: VERMELHO (Fase 2)</div>
                  <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-xl border-4 border-slate-900">
                    <span className="text-blue-600">T: BRANCO (Fase 3)</span>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-lg inline-flex items-center gap-6 border border-slate-100">
                  <div className="text-left max-w-md">
                    <p className="text-blue-600 font-black uppercase text-sm mb-2">Crimpagem Hexagonal</p>
                    <p className="text-[11px] font-bold text-slate-500 leading-tight">
                      Uso obrigatório de terminais ilhós em todos os bornes para evitar centelhamento e queda de tensão na infraestrutura Prysmian.
                    </p>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
