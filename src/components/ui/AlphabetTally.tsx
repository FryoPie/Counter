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
    if (available.length === 0) return;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Sign Language
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Alphabet Tally
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl rounded-full"></div>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Track alphabet occurrences in your sign language images with beautiful flash cards
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-12 border border-white/20 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blue-400/30">
                <div className="text-blue-300 text-sm font-medium">Active Letters</div>
                <div className="text-white text-2xl font-bold">{alphabets.length}</div>
              </div>
              
              {alphabets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-purple-400/30"
                >
                  <div className="text-purple-300 text-sm font-medium">Total Count</div>
                  <div className="text-white text-2xl font-bold">{totalCount}</div>
                </motion.div>
              )}
              
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-emerald-400/30">
                <div className="text-emerald-300 text-sm font-medium">Remaining</div>
                <div className="text-white text-2xl font-bold">{ALPHABETS.length - alphabets.length}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {alphabets.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetAllCounts}
                  className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg border border-red-400/50 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All
                  </span>
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={addAlphabet}
                disabled={alphabets.length === ALPHABETS.length}
                className={`group relative px-8 py-3 rounded-2xl font-semibold shadow-lg border overflow-hidden transition-all duration-300 ${
                  alphabets.length === ALPHABETS.length 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed border-slate-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/50'
                }`}
              >
                {alphabets.length < ALPHABETS.length && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Alphabet
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {alphabets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="relative inline-block mb-8">
              <div className="text-8xl mb-4 filter drop-shadow-lg">🤟</div>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl rounded-full"></div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Start Tallying?</h3>
            <p className="text-lg lg:text-xl text-slate-300 mb-6 lg:mb-8 max-w-md mx-auto">
              Click "Add Alphabet" to select your first letter and begin tracking sign language alphabets
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-blue-400/20">
                <span className="text-blue-300 text-lg font-medium">26 letters available</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Flash Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 transition-all duration-500 ease-in-out"
        >
          <AnimatePresence mode="popLayout">
            {alphabets.map(({ letter, count }, index) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20, rotateY: 90 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                layout
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                {/* Flash Card */}
                <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/40">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  
                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeAlphabet(letter)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 rounded-full flex items-center justify-center border border-red-400/30 hover:border-red-400/60 transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Letter Display */}
                  <div className="relative text-center mb-8">
                    <motion.div 
                      className="text-8xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2 filter drop-shadow-lg"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {letter}
                    </motion.div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                  </div>

                  {/* Count Display */}
                  <div className="text-center mb-8">
                    <motion.div
                      key={count}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="text-6xl font-black bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent filter drop-shadow-lg mb-2">
                        {count}
                      </div>
                      <div className="text-slate-300 text-xs lg:text-sm font-medium uppercase tracking-wider">
                        {count === 1 ? 'occurrence' : 'occurrences'}
                      </div>
                    </motion.div>
                  </div>

                  {/* Control Buttons */}
                  <div className="space-y-4">
                    {/* Main Controls */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => incrementCount(letter)}
                        className="flex-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 hover:text-emerald-200 px-4 py-4 rounded-2xl font-semibold transition-all duration-200 border border-emerald-400/30 hover:border-emerald-400/50 backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="hidden sm:inline">Increment</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: count === 0 ? 1 : 1.05, y: count === 0 ? 0 : -2 }}
                        whileTap={{ scale: count === 0 ? 1 : 0.95 }}
                        onClick={() => decrementCount(letter)}
                        disabled={count === 0}
                        className={`flex-1 px-4 py-4 rounded-2xl font-semibold transition-all duration-200 border backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg ${
                          count === 0 
                            ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border-slate-600/30' 
                            : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-orange-300 hover:text-orange-200 border-orange-400/30 hover:border-orange-400/50'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="hidden sm:inline">Decrement</span>
                      </motion.button>
                    </div>

                    {/* Quick Add Buttons */}
                    <div className="flex gap-2">
                      {[5, 10].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAlphabets(prev =>
                            prev.map(a =>
                              a.letter === letter ? { ...a, count: Math.min(999, a.count + num) } : a
                            )
                          )}
                          className="flex-1 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:from-blue-500/25 hover:to-purple-500/25 text-blue-300 hover:text-blue-200 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-blue-400/20 hover:border-blue-400/40 backdrop-blur-sm shadow-md"
                        >
                          +{num}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        {alphabets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl px-6 lg:px-8 py-4 lg:py-6 border border-white/10 inline-block">
              <p className="text-slate-300 text-base lg:text-lg">
                <span className="font-semibold text-white">{alphabets.length}</span> alphabet{alphabets.length !== 1 ? 's' : ''} active • 
                <span className="font-semibold text-white"> {ALPHABETS.length - alphabets.length}</span> remaining • 
                <span className="font-semibold text-white"> {totalCount}</span> total occurrences
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}