import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Shield, User } from 'lucide-react';

const DUMMY_MEMBERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Premium', status: 'Active', joinDate: '2025-10-12' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Basic', status: 'Inactive', joinDate: '2026-01-05' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Premium', status: 'Active', joinDate: '2026-03-20' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Basic', status: 'Active', joinDate: '2026-04-15' },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Standard', status: 'Pending', joinDate: '2026-05-28' },
];

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = DUMMY_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Members</h1>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20 w-full sm:w-auto justify-center cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="glass rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-transparent rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 text-foreground/70 text-sm border-b border-white/10">
                <th className="p-4 font-medium">Member</th>
                <th className="p-4 font-medium hidden sm:table-cell">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium hidden md:table-cell">Joined</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-foreground/60">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <div className="flex items-center space-x-2 text-foreground/80">
                      {member.role === 'Premium' ? <Shield className="w-4 h-4 text-purple-500" /> : <User className="w-4 h-4 text-blue-500" />}
                      <span>{member.role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      member.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      member.status === 'Inactive' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-foreground/70">
                    {member.joinDate}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="sm:hidden p-1.5 text-foreground/60 cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMembers.length === 0 && (
            <div className="p-8 text-center text-foreground/50">
              No members found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
