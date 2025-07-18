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

  // Reset all counts
  const resetAllCounts = () => {
    setAlphabets(prev => prev.map(a => ({ ...a, count: 0 })));
  };

  // Get total count
  const totalCount = alphabets.reduce((sum, a) => sum + a.count, 0);

  return (
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide select-none font-sans text-white mb-2">
            Sign Language Alphabet Tally
          </h1>
          <p className="text-gray-400 text-lg">
            Track alphabet occurrences in your sign language images
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Total Count Display */}
          {alphabets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600"
            >
              <span className="text-gray-300 text-sm">Total Count: </span>
              <span className="text-white font-bold text-lg">{totalCount}</span>
            </motion.div>
          )}
          
          {/* Control Buttons */}
          <div className="flex gap-3">
            {alphabets.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAllCounts}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-md border border-red-500"
                title="Reset All Counts"
              >
                Reset All
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addAlphabet}
              disabled={alphabets.length === ALPHABETS.length}
              className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md border
                ${alphabets.length === ALPHABETS.length 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-500 hover:shadow-lg'}`}
              title="Add Alphabet"
            >
              <span className="text-xl mr-2">+</span>
              Add Alphabet
            </motion.button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {alphabets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🤟</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">No alphabets added yet</h2>
          <p className="text-gray-500 mb-6">Click "Add Alphabet" to start tallying</p>
        </motion.div>
      )}

      {/* Alphabet Grid */}
      <motion.div
        layout
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 transition-all duration-500 ease-in-out"
      >
        <AnimatePresence mode="popLayout">
          {alphabets.map(({ letter, count }) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              layout
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex flex-col items-center shadow-xl select-none border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              {/* Header with Letter and Remove Button */}
              <div className="flex justify-between items-center w-full mb-6">
                <motion.h2 
                  className="text-5xl font-extrabold font-sans text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {letter}
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeAlphabet(letter)}
                  className="text-red-400 hover:text-red-300 font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-900/30 transition-all duration-200 border border-red-400/30 hover:border-red-400"
                  title={`Remove ${letter}`}
                >
                  ×
                </motion.button>
              </div>

              {/* Count Display */}
              <motion.div
                key={count}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.3 }}
                className="text-7xl font-extrabold mb-8 text-white font-sans bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent"
              >
                {count}
              </motion.div>

              {/* Control Buttons */}
              <div className="flex gap-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => incrementCount(letter)}
                  className="flex-1 bg-gray-700 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 shadow-md border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-2"
                  title={`Increment ${letter}`}
                >
                  <span className="text-xl">▲</span>
                  <span className="hidden sm:inline">Up</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: count === 0 ? '#374151' : '#374151' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => decrementCount(letter)}
                  disabled={count === 0}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-md border flex items-center justify-center gap-2
                    ${count === 0 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700' 
                      : 'bg-gray-700 text-white hover:bg-gray-600 border-gray-600 hover:border-gray-500'}`}
                  title={`Decrement ${letter}`}
                >
                  <span className="text-xl">▼</span>
                  <span className="hidden sm:inline">Down</span>
                </motion.button>
              </div>

              {/* Quick Add Buttons */}
              <div className="flex gap-2 mt-4 w-full">
                {[5, 10].map((num) => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAlphabets(prev =>
                      prev.map(a =>
                        a.letter === letter ? { ...a, count: Math.min(999, a.count + num) } : a
                      )
                    )}
                    className="flex-1 bg-blue-600/20 text-blue-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600/30 transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50"
                    title={`Add ${num} to ${letter}`}
                  >
                    +{num}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer Info */}
      {alphabets.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>Tracking {alphabets.length} alphabet{alphabets.length !== 1 ? 's' : ''} • {ALPHABETS.length - alphabets.length} remaining</p>
        </motion.div>
      )}
    </div>
  );
}