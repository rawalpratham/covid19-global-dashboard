import { useTheme } from '@/hooks/useTheme';
import { Information } from '@/components/Information';
import { Header } from '@/components/Header';
import { GlobalStats } from '@/components/GlobalStats';
import { CountryCases } from '@/components/CountryCases';
import { GrowthChart } from '@/components/GrowthChart';
import { SpreadChart } from '@/components/SpreadChart';
import { Fatalities } from '@/components/Fatalities';
import { Recoveries } from '@/components/Recoveries';
import { TrendChart } from '@/components/TrendChart';
import { Footer } from '@/components/Footer';
import { ReturnToTop } from '@/components/ReturnToTop';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen bg-base text-ink">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Information />
      <main>
        <GlobalStats />
        <CountryCases />
        <GrowthChart />
        <SpreadChart />
        <Fatalities />
        <Recoveries />
        <TrendChart />
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
