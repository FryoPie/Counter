"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabetCount {
  letter: string;
  count: number;
}

export default function AlphabetTally() {
  const [alphabets, setAlphabets] = useState<AlphabetCount[]>([]);

  // Add a new alphabet to tally
  const addAlphabet = () => {
    const usedLetters = alphabets.map(a => a.letter);
    const available = ALPHABETS.filter(l => !usedLetters.includes(l));
    if (available.length === 0) return; // all alphabets added
    const newLetter = available[0];
    setAlphabets(prev => [...prev, { letter: newLetter, count: 0 }]);
  };

  // Remove an alphabet from tally
  const removeAlphabet = (letter: string) => {
    setAlphabets(prev => prev.filter(a => a.letter !== letter));
  };

  // Increment count for an alphabet
  const incrementCount = (letter: string) => {
    setAlphabets(prev =>
      prev.map(a =>
        a.letter === letter ? { ...a, count: Math.min(999, a.count + 1) } : a
      )
    );
  };

  // Decrement count for an alphabet
  const decrementCount = (letter: string) => {
    setAlphabets(prev =>
      prev.map(a =>
        a.letter === letter ? { ...a, count: Math.max(0, a.count - 1) } : a
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-wide select-none font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
          Sign Language Alphabet Tally
        </h1>
        <button
          onClick={addAlphabet}
          disabled={alphabets.length === ALPHABETS.length}
          className={`px-6 py-3 rounded-md font-semibold transition 
            ${alphabets.length === ALPHABETS.length ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 active:scale-95 shadow-md'}`}
          aria-label="Add Alphabet"
          title="Add Alphabet"
        >
          +
        </button>
      </div>
      <motion.div
        layout
        className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8 transition-all duration-500 ease-in-out"
      >
        <AnimatePresence>
          {alphabets.map(({ letter, count }) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-xl select-none"
            >
              <div className="flex justify-between w-full mb-5">
                <h2 className="text-6xl font-extrabold font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {letter}
                </h2>
                <button
                  onClick={() => removeAlphabet(letter)}
                  className="text-red-500 font-bold text-3xl hover:text-red-700 transition transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
                  aria-label={`Remove ${letter}`}
                  title={`Remove ${letter}`}
                >
                  &minus;
                </button>
              </div>
              <motion.div
                key={count}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="text-8xl font-extrabold mb-8 text-white font-sans"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {count}
              </motion.div>
              <div className="flex space-x-6">
                <button
                  onClick={() => incrementCount(letter)}
                  className="bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-600 transition transform active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`Increment ${letter}`}
                  title={`Increment ${letter}`}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementCount(letter)}
                  disabled={count === 0}
                  className={`px-8 py-4 rounded-lg font-semibold transition transform active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-white
                    ${count === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  aria-label={`Decrement ${letter}`}
                  title={`Decrement ${letter}`}
                >
                  ▼
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
