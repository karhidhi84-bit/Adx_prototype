import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Clock,
  Plus,
  CheckCircle,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusClub, CampusEvent } from '../types';

export const CampusView: React.FC<{
  onOpenCreateEvent: () => void;
  onOpenCreateClubAnnouncement: (clubId: string) => void;
}> = ({ onOpenCreateEvent, onOpenCreateClubAnnouncement }) => {
  const {
    events,
    clubs,
    toggleEventRsvp,
    toggleClubMembership,
    userRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'events' | 'clubs'>('events');
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');
  const [clubCategoryFilter, setClubCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const eventCategories = ['All', 'Hackathon & Tech', 'Cultural Fest', 'Academic', 'Sports', 'Career & Workshop'];
  const clubCategories = ['All', 'Technology', 'Debate & Arts', 'Social & Service', 'Sports & Athletics'];

  const filteredEvents = events
    .filter(e => eventCategoryFilter === 'All' || e.category === eventCategoryFilter)
    .filter(e => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    });

  const filteredClubs = clubs
    .filter(c => clubCategoryFilter === 'All' || c.category === clubCategoryFilter)
    .filter(c => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.president.toLowerCase().includes(q)
      );
    });

  const getEventCategoryBadge = (category: string) => {
    switch (category) {
      case 'Hackathon & Tech':
        return 'text-blue-950 dark:text-blue-200 bg-blue-100/90 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800';
      case 'Cultural Fest':
        return 'text-amber-950 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800';
      case 'Academic':
        return 'text-indigo-950 dark:text-indigo-200 bg-indigo-100/90 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-800';
      case 'Sports':
        return 'text-emerald-950 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800';
      case 'Career & Workshop':
      default:
        return 'text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700';
    }
  };

  const getEventIndicatorBorder = (category: string) => {
    switch (category) {
      case 'Hackathon & Tech':
        return 'border-l-4 border-l-blue-900 dark:border-l-blue-500';
      case 'Cultural Fest':
        return 'border-l-4 border-l-amber-700 dark:border-l-amber-500';
      case 'Academic':
        return 'border-l-4 border-l-indigo-900 dark:border-l-indigo-500';
      case 'Sports':
        return 'border-l-4 border-l-emerald-800 dark:border-l-emerald-500';
      case 'Career & Workshop':
      default:
        return 'border-l-4 border-l-stone-700 dark:border-l-stone-400';
    }
  };

  const getClubCategoryBadge = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'text-blue-950 dark:text-blue-200 bg-blue-100/90 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800';
      case 'Debate & Arts':
        return 'text-amber-950 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800';
      case 'Sports & Athletics':
        return 'text-emerald-950 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800';
      default:
        return 'text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700';
    }
  };

  const getClubIndicatorBorder = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'border-l-4 border-l-blue-900 dark:border-l-blue-500';
      case 'Debate & Arts':
        return 'border-l-4 border-l-amber-700 dark:border-l-amber-500';
      case 'Sports & Athletics':
        return 'border-l-4 border-l-emerald-800 dark:border-l-emerald-500';
      default:
        return 'border-l-4 border-l-stone-600 dark:border-l-stone-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Classic Academic Ivy Tone */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-900 px-2 py-0.5 rounded font-mono">
                AcadeX Campus
              </span>
              <span aria-hidden="true">·</span>
              <span>Student Societies & Academic Guilds</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1 font-display">
              Campus Events & Collegiate Guilds Directory
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Discover symposia, hackathons, academic festivals, student societies, and weekly colloquia
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateEvent}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap border border-amber-600/40 font-display"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              Propose Event
            </button>
          </div>
        </div>

        {/* View Mode Tabs: Events vs Clubs */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex-wrap gap-3">
          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-semibold">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-1.5 rounded transition-all font-display ${
                activeTab === 'events'
                  ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Campus Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-4 py-1.5 rounded transition-all font-display ${
                activeTab === 'clubs'
                  ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Collegiate Guilds ({clubs.length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTab === 'events' ? 'Search symposia, fests...' : 'Search societies, topics...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-64 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Events View */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {eventCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setEventCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap font-display ${
                  eventCategoryFilter === cat
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] shadow-xs font-bold'
                    : 'bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid with Classic Academic Ivy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredEvents.map(event => {
              const badgeCls = getEventCategoryBadge(event.category);
              const indicatorCls = getEventIndicatorBorder(event.category);

              return (
                <div
                  key={event.id}
                  className={`bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 ${indicatorCls} rounded-xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col justify-between shadow-2xs group`}
                >
                  {event.imageUrl && (
                    <div className="h-48 w-full relative overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-3.5 left-4.5 right-4.5 text-white">
                        <span className={`text-xs font-mono uppercase tracking-wider inline-block px-2 py-0.5 rounded font-bold mb-1 ${badgeCls}`}>
                          {event.category}
                        </span>
                        <h3 className="text-lg font-bold leading-tight drop-shadow-xs font-display">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5.5 flex-1 flex flex-col justify-between">
                    <div>
                      {!event.imageUrl && (
                        <div className="mb-2.5">
                          <span className={`text-xs font-mono uppercase tracking-wider inline-block px-2 py-0.5 rounded font-bold ${badgeCls}`}>
                            {event.category}
                          </span>
                          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1.5 leading-snug font-display">
                            {event.title}
                          </h3>
                        </div>
                      )}

                      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                        {event.description}
                      </p>

                      {/* Metadata */}
                      <div className="space-y-2 mt-3.5 pt-3.5 border-t border-stone-100 dark:border-stone-800 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          <span className="font-mono tabular-nums font-semibold text-stone-800 dark:text-stone-200">
                            {event.date} · {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-stone-400" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span>Convened by <strong className="text-stone-700 dark:text-stone-300">{event.organizer}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-xs md:text-sm font-mono tabular-nums text-stone-500 font-medium">
                        {event.attendeeCount} scholars attending
                      </span>

                      <button
                        onClick={() => toggleEventRsvp(event.id)}
                        className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 font-display ${
                          event.isRsvpd
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 border border-amber-600/40 shadow-xs'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {event.isRsvpd ? 'RSVP Confirmed ✓' : 'RSVP for Event'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Clubs View with Muted Cool Category Badges */}
      {activeTab === 'clubs' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {clubCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setClubCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap font-display ${
                  clubCategoryFilter === cat
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] shadow-xs font-bold'
                    : 'bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredClubs.map(club => {
              const badgeCls = getClubCategoryBadge(club.category);
              const indicatorCls = getClubIndicatorBorder(club.category);

              return (
                <div
                  key={club.id}
                  className={`bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 ${indicatorCls} rounded-xl p-6 hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col justify-between shadow-2xs`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className={`text-xs font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${badgeCls}`}>
                          {club.category}
                        </span>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1.5 font-display">
                          {club.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleClubMembership(club.id)}
                        className={`px-3.5 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap font-display ${
                          club.isMember
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 hover:bg-amber-100 border border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {club.isMember ? 'Active Member ✓' : 'Join Guild'}
                      </button>
                    </div>

                    <p className="text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed font-sans">
                      {club.description}
                    </p>

                    <div className="space-y-2 mt-3.5 pt-3.5 border-t border-stone-100 dark:border-stone-800 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                        <span>{club.regularMeeting}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-400" />
                        <span>{club.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Guild Master: <strong className="text-stone-700 dark:text-stone-300">{club.president}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-amber-800 dark:text-amber-400">{club.contactEmail}</span>
                      </div>
                    </div>

                    {/* Club Announcements */}
                    {club.announcements.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-display">
                            Latest Guild Dispatches
                          </span>
                          <button
                            onClick={() => onOpenCreateClubAnnouncement(club.id)}
                            className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline font-display"
                          >
                            + Post Notice
                          </button>
                        </div>

                        <div className="space-y-2">
                          {club.announcements.slice(0, 2).map(ann => (
                            <div
                              key={ann.id}
                              className="p-3 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60 text-xs md:text-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-stone-900 dark:text-white font-display">
                                  {ann.title}
                                </span>
                                <span className="text-xs font-mono tabular-nums text-stone-500">
                                  {ann.date}
                                </span>
                              </div>
                              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                                {ann.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs md:text-sm text-stone-500">
                    <span className="font-mono tabular-nums font-semibold text-amber-800 dark:text-amber-400">
                      {club.memberCount} Registered Scholars
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
