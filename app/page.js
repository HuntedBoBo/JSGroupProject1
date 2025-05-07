'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/employees.json')
      .then((res) => res.json())
      .then((data) => setEmployees(data.employees));
  }, []);

  const handleSearch = () => {
    const results = employees.filter(
      (emp) =>
        emp.name.includes(query) ||
        emp.role.includes(query) ||
        emp.bio.includes(query)
    );
    setFiltered(results);
  };

  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] p-4 sm:p-8 font-sans bg-gray-50 dark:bg-black text-black dark:text-white">
      <main className="row-start-2 flex flex-col items-center sm:items-start gap-10 w-full max-w-4xl mx-auto">
        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* Search Box */}
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search employees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 w-full sm:w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white dark:bg-white dark:text-black px-5 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Results */}
        <ul className="flex flex-col gap-6 w-full">
          {(filtered.length > 0 || query ? filtered : employees).map((emp) => (
            <li
              key={emp.id}
              className="flex flex-col sm:flex-row gap-4 items-center sm:items-start border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-white dark:bg-neutral-900 hover:shadow-md transition"
            >
              <Image
                src={emp.photoUrl}
                alt={emp.name}
                width={80}
                height={80}
                className="rounded-full object-cover border"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-bold">{emp.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{emp.role}</p>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-200 max-w-prose">{emp.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="row-start-3 mt-10 flex flex-wrap justify-center gap-6 text-sm text-center text-gray-500 dark:text-gray-400">
        <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer">Learn</a>
        <a href="https://vercel.com/templates?framework=next.js" target="_blank" rel="noopener noreferrer">Examples</a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js Site →</a>
      </footer>
    </div>
  );
}
