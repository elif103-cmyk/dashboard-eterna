import React from 'react';
import { LifeBuoy, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { getSupportTickets } from '../../services/crmService';

export const CRMSupport: React.FC = () => {
  const tickets = getSupportTickets();

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-serif font-bold text-eterna-primary">Destek Merkezi</h1>
            <p className="text-gray-600">Kullanıcı taleplerini ve sorun bildirimlerini yönetin.</p>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          {/* Kanban Columns */}
          {['Yeni', 'İnceleniyor', 'Çözüldü'].map((status) => {
              const items = tickets.filter(t => t.status === status);
              const color = status === 'Yeni' ? 'blue' : status === 'İnceleniyor' ? 'orange' : 'green';
              
              return (
                  <div key={status} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 h-full min-h-[500px]">
                      <div className="flex items-center justify-between mb-4 px-2">
                          <h3 className="font-bold text-gray-700 flex items-center gap-2">
                              {status === 'Yeni' && <Clock size={18} className="text-blue-500" />}
                              {status === 'İnceleniyor' && <LifeBuoy size={18} className="text-orange-500" />}
                              {status === 'Çözüldü' && <CheckCircle size={18} className="text-green-500" />}
                              {status}
                          </h3>
                          <span className="bg-white px-2 py-1 rounded-md text-xs font-bold text-gray-500 shadow-sm">{items.length}</span>
                      </div>
                      
                      <div className="space-y-3">
                          {items.map(ticket => (
                              <div key={ticket.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                  <div className="flex justify-between items-start mb-2">
                                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded 
                                        ${ticket.priority === 'Yüksek' ? 'bg-red-100 text-red-700' : 
                                          ticket.priority === 'Orta' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                                          {ticket.priority}
                                      </span>
                                      <span className="text-xs text-gray-400">{new Date(ticket.date).toLocaleDateString('tr-TR')}</span>
                                  </div>
                                  <h4 className="font-bold text-gray-800 text-sm mb-1">{ticket.subject}</h4>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                      <span className="font-medium text-eterna-primary">User #{ticket.userId}</span>
                                  </div>
                                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                                      <button className="text-xs font-medium text-gray-500 hover:text-eterna-primary flex items-center gap-1">
                                          <MessageSquare size={14} /> Yanıtla
                                      </button>
                                      <button className="text-xs font-medium text-eterna-primary hover:underline">Detay</button>
                                  </div>
                              </div>
                          ))}
                          {items.length === 0 && (
                              <div className="text-center py-8 text-gray-400 text-sm italic">
                                  Talep bulunmuyor.
                              </div>
                          )}
                      </div>
                  </div>
              );
          })}
      </div>
    </div>
  );
};