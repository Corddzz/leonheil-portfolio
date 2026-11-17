import React from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import NavbarSection from "./components/NavbarSection";
import Hero from "./sections/Hero";
import Portfolio from "./components/Portfolio";
import BackgroundSection from "./components/BackgroundSection";

const App = () => {
  return (
    // <Background>
    //   <Hero />
    // </Background>
    // <Portfolio />
    <BackgroundSection showScrollHint>
      <NavbarSection />
    </BackgroundSection>
  );
};

export default App;
