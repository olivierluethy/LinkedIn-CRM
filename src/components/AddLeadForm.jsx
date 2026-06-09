import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { createLead } from '../lib/schemas';

export default function AddLeadForm({ creators, onAdd, onClose }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onAdd(createLead({
      name: name.trim(),
      linkedinUrl: url.trim(),
      parentCreatorId: creatorId || null,
      notes: notes.trim(),
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-light" />
            Add New Lead
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">LinkedIn URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Parent Creator</label>
            <select
              value={creatorId}
              onChange={(e) => setCreatorId(e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
            >
              <option value="">— No creator —</option>
              {creators.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Replied to my comment about AI trends..."
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-light rounded-lg transition-colors"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  );
}
