import { useState, useCallback } from 'react';
import * as store from '../lib/store';
import { computeFomoScore } from '../lib/schemas';

export function useLeads() {
  const [leads, setLeads] = useState(store.getLeads);

  const add = useCallback((lead) => {
    setLeads(store.saveLead(lead));
  }, []);

  const update = useCallback((lead) => {
    setLeads(store.saveLead(lead));
  }, []);

  const remove = useCallback((id) => {
    setLeads(store.deleteLead(id));
  }, []);

  return { leads, addLead: add, updateLead: update, removeLead: remove };
}

export function useCreators() {
  const [creators, setCreators] = useState(store.getCreators);

  const add = useCallback((creator) => {
    setCreators(store.saveCreator(creator));
  }, []);

  const update = useCallback((creator) => {
    setCreators(store.saveCreator(creator));
  }, []);

  const remove = useCallback((id) => {
    setCreators(store.deleteCreator(id));
  }, []);

  return { creators, addCreator: add, updateCreator: update, removeCreator: remove };
}

export function useWeeklyLimit(maxPerWeek = 100) {
  const [log, setLog] = useState(store.getWeeklyLog);

  const increment = useCallback(() => {
    setLog(store.incrementWeeklySent());
  }, []);

  const decrement = useCallback(() => {
    setLog(store.decrementWeeklySent());
  }, []);

  return {
    sent: log.sent,
    remaining: Math.max(0, maxPerWeek - log.sent),
    weekKey: log.weekKey,
    maxPerWeek,
    increment,
    decrement,
    isAtLimit: log.sent >= maxPerWeek,
  };
}

export function useScheduled() {
  const [items, setItems] = useState(store.getScheduled);

  const add = useCallback((item) => {
    setItems(store.saveScheduledItem(item));
  }, []);

  const update = useCallback((item) => {
    setItems(store.saveScheduledItem(item));
  }, []);

  const remove = useCallback((id) => {
    setItems(store.deleteScheduledItem(id));
  }, []);

  return { scheduled: items, addScheduled: add, updateScheduled: update, removeScheduled: remove };
}

export function useFomoScores(leads, creators) {
  const scores = {};
  for (const lead of leads) {
    scores[lead.id] = computeFomoScore(lead, creators, leads);
  }
  return scores;
}
