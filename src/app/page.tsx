import AlphabetTally from '../components/ui/AlphabetTally';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AlphabetTally />
    </main>
  );
}
