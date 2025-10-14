import Header from "./components/Header/index.jsx";
import BannerGrid from "./components/BannerGrid/index.jsx";

import About from "./components/About/index.jsx";
import Team from "./components/Team/index.jsx";
import Partners from "./components/Partners/index.jsx";
import Projects from "./components/Projects/index.jsx";
import Contact from "./components/Сontact/index.jsx";
import Footer from "./components/Footer/index.jsx";

export default function App() {
  return (
    <>
      <Header />
      <BannerGrid />

      <About />
      <Team />
      <Partners />
      <Projects />
      <Contact />
      <Header openUp />
      <Footer />
    </>
  );
}