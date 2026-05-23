import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Stats } from './components/Stats';
import { Disciplines } from './components/Disciplines';
import { Anatomy } from './components/Anatomy';
import { Beliefs } from './components/Beliefs';
import { Projects } from './components/Projects';
import { Gallery } from './components/Gallery';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Disciplines />
      <Anatomy />
      <Beliefs />
      <Projects />
      <Gallery />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
