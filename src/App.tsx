import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Stats } from './components/Stats';
import { Disciplines } from './components/Disciplines';
import { Anatomy } from './components/Anatomy';
import { Beliefs } from './components/Beliefs';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Gallery } from './components/Gallery';
import { FeaturedProject } from './components/FeaturedProject';
import { Testimonials } from './components/Testimonials';
import { Team } from './components/Team';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { Splash } from './components/Splash';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Splash />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Disciplines />
      <Anatomy />
      <Beliefs />
      <Process />
      <Projects />
      <Gallery />
      <FeaturedProject />
      <Testimonials />
      <Team />
      <Clients />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
