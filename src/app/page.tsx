import dynamic from 'next/dynamic';

const AlphabetTally = dynamic(() => import('../components/ui/AlphabetTally'), {
  ssr: false
});

export default function Home() {
  return (
    <AlphabetTally />
  );
}
