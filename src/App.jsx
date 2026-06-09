import { useState } from 'react';
import Sidebar from './components/Sidebar';
import BoardView from './views/BoardView';
import CalendarView from './views/CalendarView';
import CreatorsView from './views/CreatorsView';
import { useLeads, useCreators, useWeeklyLimit, useScheduled, useFomoScores } from './hooks/useStore';

export default function App() {
  const [view, setView] = useState('board');

  const { leads, addLead, updateLead, removeLead } = useLeads();
  const { creators, addCreator, updateCreator, removeCreator } = useCreators();
  const weeklyLimit = useWeeklyLimit(100);
  const { scheduled, addScheduled, updateScheduled, removeScheduled } = useScheduled();
  const fomoScores = useFomoScores(leads, creators);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={view} onNavigate={setView} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'board' && (
          <BoardView
            leads={leads}
            creators={creators}
            fomoScores={fomoScores}
            weeklyLimit={weeklyLimit}
            onAddLead={addLead}
            onUpdateLead={updateLead}
            onDeleteLead={removeLead}
            onSchedule={addScheduled}
          />
        )}
        {view === 'calendar' && (
          <CalendarView
            scheduled={scheduled}
            leads={leads}
            onRemoveScheduled={removeScheduled}
            onUpdateScheduled={updateScheduled}
          />
        )}
        {view === 'creators' && (
          <CreatorsView
            creators={creators}
            leads={leads}
            onAddCreator={addCreator}
            onUpdateCreator={updateCreator}
            onDeleteCreator={removeCreator}
          />
        )}
      </main>
    </div>
  );
}
