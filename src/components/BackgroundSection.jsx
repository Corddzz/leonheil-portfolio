import React from "react";
import "../sections/BackgroundSection.css";

export const HeroBackground = ({
  showGrid = true,
  orbs = ["hero-orb-1", "hero-orb-2"],
}) => {
  return (
    <div className="hero-background" aria-hidden="true">
      {showGrid && <div className="hero-bg-grid" />}

      {orbs.map((orbClassName) => (
        <div key={orbClassName} className={`hero-orb ${orbClassName}`} />
      ))}
    </div>
  );
};

export const ScrollHint = () => {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <div className="scroll-mouse">
        <div className="scroll-wheel" />
      </div>
    </div>
  );
};

export const BackgroundSection = ({
  children,
  className = "",
  showScrollHint = false,
}) => {
  return (
    <section className={`hero-section ${className}`}>
      <HeroBackground />

      <div className="hero-content">{children}</div>

      {showScrollHint && <ScrollHint />}
    </section>
  );
};

export default BackgroundSection;
