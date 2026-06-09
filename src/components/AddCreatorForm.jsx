import { useState } from 'react';
import { Crown, X } from 'lucide-react';
import { createCreator } from '../lib/schemas';

export default function AddCreatorForm({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [followers, setFollowers] = useState('');
  const [mutuals, setMutuals] = useState('');
  const [isTop, setIsTop] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onAdd(createCreator({
      name: name.trim(),
      linkedinUrl: url.trim(),
      followerCount: parseInt(followers) || 0,
      mutualConnections: parseInt(mutuals) || 0,
      topInfluencerStatus: isTop,
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
            <Crown className="w-5 h-5 text-warm" />
            Add Creator
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Creator Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gary Vaynerchuk"
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
              placeholder="https://linkedin.com/in/garyvee"
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Followers</label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="150000"
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Mutual Connections</label>
              <input
                type="number"
                value={mutuals}
                onChange={(e) => setMutuals(e.target.value)}
                placeholder="12"
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isTop}
              onChange={(e) => setIsTop(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand focus:ring-brand-light/30"
            />
            <span className="text-sm text-zinc-300">Top Influencer Status</span>
          </label>
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
            Add Creator
          </button>
        </div>
      </form>
    </div>
  );
}
