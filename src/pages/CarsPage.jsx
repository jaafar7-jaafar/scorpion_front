import React, { useEffect, useState } from 'react';
import { getCars } from '../api';
import { MOCK_CARS } from '../utils/mockData';
import CarCard from '../components/CarCard';

export default function CarsPage({ onBookNow }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getCars()
      .then((r) => setCars(r.data))
      .catch(() => setCars(MOCK_CARS))
      .finally(() => setLoading(false));
  }, []);

  // Filter buttons come from the unique seat values assigned to cars
  const filterOptions = [
    'All',
    ...Array.from(new Set(cars.map((c) => c.seat).filter(Boolean))).sort(),
  ];

  // Reset to 'All' if the previously selected filter no longer exists
  const activeFilter = filterOptions.includes(filter) ? filter : 'All';

  const filtered = cars.filter((car) => {
    const matchesSearch =
      !search ||
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = activeFilter === 'All' || car.seat === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="max-w-container mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Fleet</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Luxury Cart Gallery</h1>
          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
            Discover our curated collection of high-performance golf carts, designed for the perfect balance of elegance and comfort in San Pedro.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-zinc-100"
          style={{ boxShadow: '0 2px 8px rgba(1,45,29,0.05)' }}>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeFilter === opt
                    ? 'bg-secondary-container text-secondary border border-secondary/20'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">search</span>
            <input
              type="text"
              placeholder="Search cart models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse border border-zinc-100">
                <div className="aspect-[4/3] bg-zinc-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-100 rounded w-full" />
                  <div className="h-4 bg-zinc-100 rounded w-2/3" />
                  <div className="h-10 bg-zinc-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-zinc-300 block mb-4">search_off</span>
            <h3 className="font-serif text-xl text-zinc-400 mb-2">No carts found</h3>
            <p className="text-zinc-400 text-sm">Try adjusting your search or filter.</p>
            <button onClick={() => { setSearch(''); setFilter('All'); }}
              className="mt-4 text-secondary font-semibold text-sm underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onBookNow={onBookNow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
