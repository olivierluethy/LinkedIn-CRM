import { useState } from 'react';
import { Plus, Crown, ExternalLink, Trash2, Users, TrendingUp, Edit3, X, Check } from 'lucide-react';
import AddCreatorForm from '../components/AddCreatorForm';

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function CreatorCard({ creator, leadCount, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [followers, setFollowers] = useState(String(creator.followerCount));
  const [mutuals, setMutuals] = useState(String(creator.mutualConnections));
  const [isTop, setIsTop] = useState(creator.topInfluencerStatus);

  const save = () => {
    onUpdate({
      ...creator,
      followerCount: parseInt(followers) || 0,
      mutualConnections: parseInt(mutuals) || 0,
      topInfluencerStatus: isTop,
    });
    setEditing(false);
  };

  return (
    <div className="bg-surface-alt border border-zinc-700/50 rounded-xl p-5 hover:border-zinc-600 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-warm/20 flex items-center justify-center">
            <Crown className="w-5 h-5 text-warm" />
          </div>
          <div>
            <h3 className="font-semibold">{creator.name}</h3>
            {creator.topInfluencerStatus && (
              <span className="text-xs bg-warm/20 text-warm px-2 py-0.5 rounded-full font-medium">
                Top Influencer
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="text-zinc-600 hover:text-zinc-300 p-1.5 rounded-md hover:bg-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button onClick={save} className="text-connected hover:text-white p-1.5 rounded-md hover:bg-zinc-700/50">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => setEditing(false)} className="text-zinc-500 hover:text-white p-1.5 rounded-md hover:bg-zinc-700/50">
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(creator.id)}
            className="text-zinc-600 hover:text-fomo-high p-1.5 rounded-md hover:bg-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-zinc-800/60 rounded-lg p-3 text-center">
          <TrendingUp className="w-4 h-4 text-zinc-500 mx-auto mb-1" />
          {editing ? (
            <input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              className="w-full bg-zinc-700 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-1 focus:ring-brand-light/30"
            />
          ) : (
            <div className="text-lg font-bold">{formatNumber(creator.followerCount)}</div>
          )}
          <div className="text-xs text-zinc-500">Followers</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3 text-center">
          <Users className="w-4 h-4 text-zinc-500 mx-auto mb-1" />
          {editing ? (
            <input
              type="number"
              value={mutuals}
              onChange={(e) => setMutuals(e.target.value)}
              className="w-full bg-zinc-700 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-1 focus:ring-brand-light/30"
            />
          ) : (
            <div className="text-lg font-bold">{creator.mutualConnections}</div>
          )}
          <div className="text-xs text-zinc-500">Mutuals</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3 text-center">
          <Crown className="w-4 h-4 text-zinc-500 mx-auto mb-1" />
          {editing ? (
            <label className="flex items-center justify-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={isTop}
                onChange={(e) => setIsTop(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800"
              />
              <span className="text-xs">Top</span>
            </label>
          ) : (
            <div className="text-lg font-bold">{creator.topInfluencerStatus ? 'Yes' : 'No'}</div>
          )}
          <div className="text-xs text-zinc-500">Top Status</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{leadCount} lead{leadCount !== 1 ? 's' : ''} linked</span>
        <a
          href={creator.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-brand-light hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Profile
        </a>
      </div>
    </div>
  );
}

export default function CreatorsView({ creators, leads, onAddCreator, onUpdateCreator, onDeleteCreator }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Creators</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Influencers whose posts you comment on</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-light rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Creator
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {creators.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <Crown className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No creators yet. Add the influencers whose posts you comment on.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {creators.map((c) => (
              <CreatorCard
                key={c.id}
                creator={c}
                leadCount={leads.filter((l) => l.parentCreatorId === c.id).length}
                onUpdate={onUpdateCreator}
                onDelete={onDeleteCreator}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AddCreatorForm
          onAdd={onAddCreator}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
