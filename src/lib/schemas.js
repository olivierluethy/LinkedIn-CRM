// Data schemas and factory functions

let _id = Date.now();
function nextId() {
  return String(++_id);
}

export function createLead({ name, linkedinUrl, parentCreatorId, notes = '' }) {
  return {
    id: nextId(),
    name,
    linkedinUrl,
    parentCreatorId,
    notes,
    status: 'warm', // warm | pending | connected
    fomoScore: 0,
    createdAt: new Date().toISOString(),
    connectedAt: null,
  };
}

export function createCreator({ name, linkedinUrl, followerCount = 0, mutualConnections = 0, topInfluencerStatus = false }) {
  return {
    id: nextId(),
    name,
    linkedinUrl,
    followerCount,
    mutualConnections,
    topInfluencerStatus,
    createdAt: new Date().toISOString(),
  };
}

export function createScheduledItem({ leadId, date, notes = '' }) {
  return {
    id: nextId(),
    leadId,
    date, // YYYY-MM-DD
    notes,
    sent: false,
    createdAt: new Date().toISOString(),
  };
}

// FOMO score: 0-100 based on parent creator authority
export function computeFomoScore(lead, creators, allLeads) {
  const creator = creators.find((c) => c.id === lead.parentCreatorId);
  if (!creator) return 0;

  // Factor 1: Creator follower count (0-40 pts)
  const followerScore = Math.min(40, (creator.followerCount / 500000) * 40);

  // Factor 2: Mutual connections with creator (0-30 pts)
  const mutualScore = Math.min(30, (creator.mutualConnections / 50) * 30);

  // Factor 3: Top influencer bonus (0-15 pts)
  const influencerBonus = creator.topInfluencerStatus ? 15 : 0;

  // Factor 4: How many other leads share this creator (network density) (0-15 pts)
  const sameCreatorLeads = allLeads.filter(
    (l) => l.parentCreatorId === creator.id && l.id !== lead.id && l.status === 'connected'
  ).length;
  const densityScore = Math.min(15, sameCreatorLeads * 3);

  return Math.round(followerScore + mutualScore + influencerBonus + densityScore);
}

// Mock API structure for Playwright integration
export const MOCK_API = {
  scanCreatorProfile: {
    endpoint: '/api/scan-creator',
    method: 'POST',
    body: { linkedinUrl: 'string' },
    response: {
      followerCount: 'number',
      mutualConnections: 'number',
      topInfluencerStatus: 'boolean',
      name: 'string',
      headline: 'string',
    },
  },
  scanLeadProfile: {
    endpoint: '/api/scan-lead',
    method: 'POST',
    body: { linkedinUrl: 'string' },
    response: {
      name: 'string',
      headline: 'string',
      mutualConnections: 'number',
      recentActivity: 'object[]',
    },
  },
};
