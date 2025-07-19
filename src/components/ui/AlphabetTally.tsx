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
  const [showAlphabetSelector, setShowAlphabetSelector] = useState(false);

  // Add a new alphabet to tally
  const addAlphabet = (selectedLetter?: string) => {
    if (selectedLetter) {
      // Add specific letter if provided
      if (!alphabets.find(a => a.letter === selectedLetter)) {
        setAlphabets(prev => [...prev, { letter: selectedLetter, count: 0 }]);
      }
      setShowAlphabetSelector(false);
    } else {
      // Show selector if no letter provided
      setShowAlphabetSelector(true);
    }
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

  // Get available letters for selection
  const availableLetters = ALPHABETS.filter(letter => 
    !alphabets.find(a => a.letter === letter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 lg:mb-4 tracking-tight">
              Sign Language
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Alphabet Tally
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl rounded-full"></div>
          </div>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Track alphabet occurrences in your sign language images with beautiful flash cards
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl px-4 lg:px-6 py-3 lg:py-4 border border-blue-400/30">
                <div className="text-blue-300 text-xs lg:text-sm font-medium">Active Letters</div>
                <div className="text-white text-xl lg:text-2xl font-bold">{alphabets.length}</div>
              </div>
              
              {alphabets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl px-4 lg:px-6 py-3 lg:py-4 border border-purple-400/30"
                >
                  <div className="text-purple-300 text-xs lg:text-sm font-medium">Total Count</div>
                  <div className="text-white text-xl lg:text-2xl font-bold">{totalCount}</div>
                </motion.div>
              )}
              
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl px-4 lg:px-6 py-3 lg:py-4 border border-emerald-400/30">
                <div className="text-emerald-300 text-xs lg:text-sm font-medium">Remaining</div>
                <div className="text-white text-xl lg:text-2xl font-bold">{ALPHABETS.length - alphabets.length}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {alphabets.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetAllCounts}
                  className="group relative px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg border border-red-400/50 overflow-hidden transition-all duration-300 text-sm lg:text-base"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All
                  </span>
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addAlphabet()}
                disabled={alphabets.length === ALPHABETS.length}
                className={`group relative px-6 lg:px-8 py-2 lg:py-3 rounded-2xl font-semibold shadow-lg border overflow-hidden transition-all duration-300 text-sm lg:text-base ${
                  alphabets.length === ALPHABETS.length 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed border-slate-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/50'
                }`}
              >
                {alphabets.length < ALPHABETS.length && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Alphabet
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Alphabet Selector Modal */}
        <AnimatePresence>
          {showAlphabetSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAlphabetSelector(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">Select Alphabet</h3>
                  <p className="text-slate-300">Choose which alphabet you want to start tallying</p>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 lg:gap-4 mb-6">
                  {availableLetters.map((letter) => (
                    <motion.button
                      key={letter}
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addAlphabet(letter)}
                      className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 border border-blue-400/30 hover:border-blue-400/60 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl font-black text-white transition-all duration-200 backdrop-blur-sm"
                    >
                      {letter}
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAlphabetSelector(false)}
                    className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl font-semibold border border-slate-500/50 hover:from-slate-500 hover:to-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {alphabets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12 lg:py-20"
          >
            <div className="relative inline-block mb-6 lg:mb-8">
              <div className="text-6xl lg:text-8xl mb-4 filter drop-shadow-lg">🤟</div>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl rounded-full"></div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Start Tallying?</h3>
            <p className="text-lg lg:text-xl text-slate-300 mb-6 lg:mb-8 max-w-md mx-auto">
              Click "Add Alphabet" to select your first letter and begin tracking sign language alphabets
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 lg:px-8 py-3 lg:py-4 border border-blue-400/20">
                <span className="text-blue-300 text-base lg:text-lg font-medium">26 letters available</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Flash Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 transition-all duration-500 ease-in-out"
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
                  scale: 1.02, 
                  rotateY: 2,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                {/* Flash Card */}
                <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 xl:p-8 border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/40 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] flex flex-col">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
                  <div className="absolute top-0 right-0 w-20 lg:w-32 h-20 lg:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 lg:-translate-y-16 translate-x-10 lg:translate-x-16"></div>
                  
                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeAlphabet(letter)}
                    className="absolute top-2 lg:top-4 right-2 lg:right-4 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 rounded-full flex items-center justify-center border border-red-400/30 hover:border-red-400/60 transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Letter Display */}
                  <div className="relative text-center mb-4 lg:mb-6 flex-shrink-0">
                    <motion.div 
                      className="text-5xl lg:text-6xl xl:text-8xl font-black text-white mb-2 filter drop-shadow-lg"
                      whileHover={{ scale: 1.05, rotateZ: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {letter}
                    </motion.div>
                    <div className="w-12 lg:w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                  </div>

                  {/* Count Display */}
                  <div className="text-center mb-4 lg:mb-6 flex-shrink-0">
                    <motion.div
                      key={count}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="text-4xl lg:text-5xl xl:text-6xl font-black text-yellow-300 filter drop-shadow-lg mb-2">
                        {count}
                      </div>
                      <div className="text-slate-300 text-xs lg:text-sm font-medium uppercase tracking-wider">
                        {count === 1 ? &quot;occurrence&quot; : &quot;occurrences&quot;}
                      </div>
                    </motion.div>
                  </div>

                  {/* Control Buttons */}
                  <div className="space-y-3 lg:space-y-4 mt-auto">
                    {/* Main Controls */}
                    <div className="flex gap-2 lg:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => incrementCount(letter)}
                        className="flex-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 hover:text-emerald-200 px-3 lg:px-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-semibold transition-all duration-200 border border-emerald-400/30 hover:border-emerald-400/50 backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg text-sm lg:text-base"
                      >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="hidden sm:inline">+</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: count === 0 ? 1 : 1.05, y: count === 0 ? 0 : -2 }}
                        whileTap={{ scale: count === 0 ? 1 : 0.95 }}
                        onClick={() => decrementCount(letter)}
                        disabled={count === 0}
                        className={`flex-1 px-3 lg:px-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-semibold transition-all duration-200 border backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg text-sm lg:text-base ${
                          count === 0 
                            ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border-slate-600/30' 
                            : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-orange-300 hover:text-orange-200 border-orange-400/30 hover:border-orange-400/50'
                        }`}
                      >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="hidden sm:inline">-</span>
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
                          className="flex-1 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:from-blue-500/25 hover:to-purple-500/25 text-blue-300 hover:text-blue-200 px-2 lg:px-3 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-semibold transition-all duration-200 border border-blue-400/20 hover:border-blue-400/40 backdrop-blur-sm shadow-md"
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
            className="mt-12 lg:mt-16 text-center"
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