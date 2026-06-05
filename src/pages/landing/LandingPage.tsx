import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme/muiTheme';
import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import SearchServicesSection from '../../components/landing/SearchServicesSection';
import TopProfessionalsSection from '../../components/landing/TopProfessionalsSection';
import WhyChooseSection from '../../components/landing/WhyChooseSection';
import ContactSection from '../../components/landing/ContactSection';
import Footer from '../../components/landing/Footer';

export default function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <main>
          <HeroSection />
          <SearchServicesSection />
          <TopProfessionalsSection />
          <WhyChooseSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
