// localStorage-backed store with reactive updates

const KEYS = {
  LEADS: 'linkedcrm_leads',
  CREATORS: 'linkedcrm_creators',
  WEEKLY_LOG: 'linkedcrm_weekly_log',
  SCHEDULED: 'linkedcrm_scheduled',
};

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Leads ---

export function getLeads() {
  return read(KEYS.LEADS);
}

export function saveLead(lead) {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === lead.id);
  if (idx >= 0) leads[idx] = lead;
  else leads.push(lead);
  write(KEYS.LEADS, leads);
  return leads;
}

export function deleteLead(id) {
  const leads = getLeads().filter((l) => l.id !== id);
  write(KEYS.LEADS, leads);
  return leads;
}

// --- Creators ---

export function getCreators() {
  return read(KEYS.CREATORS);
}

export function saveCreator(creator) {
  const creators = getCreators();
  const idx = creators.findIndex((c) => c.id === creator.id);
  if (idx >= 0) creators[idx] = creator;
  else creators.push(creator);
  write(KEYS.CREATORS, creators);
  return creators;
}

export function deleteCreator(id) {
  const creators = getCreators().filter((c) => c.id !== id);
  write(KEYS.CREATORS, creators);
  return creators;
}

// --- Weekly Connection Log ---

function getCurrentWeekKey() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
}

export function getWeeklyLog() {
  const log = read(KEYS.WEEKLY_LOG, {});
  const weekKey = getCurrentWeekKey();
  return { weekKey, sent: log[weekKey] || 0 };
}

export function incrementWeeklySent() {
  const log = read(KEYS.WEEKLY_LOG, {});
  const weekKey = getCurrentWeekKey();
  log[weekKey] = (log[weekKey] || 0) + 1;
  write(KEYS.WEEKLY_LOG, log);
  return { weekKey, sent: log[weekKey] };
}

export function decrementWeeklySent() {
  const log = read(KEYS.WEEKLY_LOG, {});
  const weekKey = getCurrentWeekKey();
  log[weekKey] = Math.max(0, (log[weekKey] || 0) - 1);
  write(KEYS.WEEKLY_LOG, log);
  return { weekKey, sent: log[weekKey] };
}

// --- Scheduled Connections ---

export function getScheduled() {
  return read(KEYS.SCHEDULED);
}

export function saveScheduledItem(item) {
  const items = getScheduled();
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) items[idx] = item;
  else items.push(item);
  write(KEYS.SCHEDULED, items);
  return items;
}

export function deleteScheduledItem(id) {
  const items = getScheduled().filter((i) => i.id !== id);
  write(KEYS.SCHEDULED, items);
  return items;
}

export { KEYS };
