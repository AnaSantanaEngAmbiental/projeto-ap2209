import React, { useState, useMemo } from 'react';
import { ShoppingCart, Calculator, Trash2, PlusCircle, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('compras');
  const [inventory, setInventory] = useState([
    { id: 1, desc: "Cabo Prysmian 2,5mm² BRANCO (Fase T)", qty: 100, price: 3.45 },
    { id: 2, desc: "Cabo Prysmian 2,5mm² PRETO (Fase R)", qty: 100, price: 3.45 },
    { id: 3, desc: "Caixa de Embutir 4x4 Amarela", qty: 25, price: 6.20 }
  ]);

  const grandTotal = useMemo(() => {
    return inventory.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
  }, [inventory]);

  const addRow = () => {
    const newItem = { id: Date.now(), desc: "Novo Material", qty: 0, price: 0 };
    setInventory([newItem, ...inventory]); // Lógica inversa: novo item no topo
  };

  const updateItem = (id, key, value) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, [key]: value } : item));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* HEADER TÉCNICO */}
        <header className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl mb-8 border-b-8 border-blue-600 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">AP 2209 DASH</h1>
            <p className="text-blue-400 font-bold text-[10px] tracking-widest uppercase mt-2">Engenharia de Alta Performance</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl text-right min-w-[220px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Estimado</p>
            <p className="text-3xl font-mono font-bold text-white">R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </header>

        {/* NAVEGAÇÃO */}
        <div className="flex gap-2 mb-6">
          {['compras', 'metragem', 'crimpagem'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ÁREA DA PLANILHA */}
        {activeTab === 'compras' && (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 border border-slate-200 animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase text-slate-800 italic flex items-center gap-2">
                <Layers className="text-blue-600"/> Lista de Suprimentos
              </h2>
              <button onClick={addRow} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-[10px] flex items-center gap-2 hover:bg-blue-600 transition-all">
                <PlusCircle size={18}/> ADICIONAR NO TOPO
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-slate-400">
                    <th className="p-4">Material</th>
                    <th className="p-4 text-center">Qtd</th>
                    <th className="p-4 text-center">Preço Unit</th>
                    <th className="p-4 text-center">Total</th>
                    <th className="p-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="bg-slate-50 hover:bg-white transition-all shadow-sm">
                      <td className="p-4 rounded-l-xl">
                        <input className="font-bold text-sm bg-transparent outline-none w-full focus:text-blue-600" value={item.desc} onChange={(e) => updateItem(item.id, 'desc', e.target.value)} />
                      </td>
                      <td className="p-4 w-24">
                        <input type="number" className="w-full text-center bg-white border rounded p-2 font-bold" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', e.target.value)} />
                      </td>
                      <td className="p-4 w-24">
                        <input type="number" className="w-full text-center bg-white border rounded p-2 font-bold" value={item.price} onChange={(e) => updateItem(item.id, 'price', e.target.value)} />
                      </td>
                      <td className="p-4 text-center font-mono font-black text-blue-700">
                        R$ {(item.qty * item.price).toFixed(2)}
                      </td>
                      <td className="p-4 rounded-r-xl text-center">
                        <button onClick={() => setInventory(inventory.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA TÉCNICA RÁPIDA */}
        {activeTab === 'crimpagem' && (
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center border-b-8 border-blue-600">
            <Cpu className="mx-auto mb-4 text-blue-400" size={48} />
            <h3 className="text-2xl font-black italic mb-6 uppercase">Padrão Fase T: Branco</h3>
            <p className="text-slate-400 text-sm font-bold">Uso obrigatório de terminais ilhós em toda a rede Prysmian Flex.</p>
          </div>
        )}
      </div>
    </div>
  );
}
