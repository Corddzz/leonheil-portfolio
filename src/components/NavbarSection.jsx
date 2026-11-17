import { useState, useEffect } from "react";
import "../index.css";

const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];

const NavbarSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((isOpen) => !isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-5 px-[5vw] transition-[background,backdrop-filter,box-shadow] duration-300 ease-in-out ${
        scrolled
          ? "bg-[rgba(8,12,16,0.85)] backdrop-blur-2xl shadow-[0_1px_0_var(--border)]"
          : ""
      }`}
    >
      <a
        href="#hero"
        className="font-display text-xl font-bold text-[var(--white)] no-underline tracking-[-0.02em]"
        onClick={closeMenu}
      >
        <span className="text-[var(--accent)]">&lt;</span>
        LC
        <span className="text-[var(--accent)]">/&gt;</span>
      </a>

      <ul
        className={`flex list-none items-center gap-8 ${
          menuOpen ? "open" : ""
        }`}
      >
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--white)]"
              onClick={closeMenu}
            >
              {link}
            </a>
          </li>
        ))}

        <li>
          <a
            href="#contact"
            className="rounded-md bg-[var(--accent)] px-[1.1rem] py-[0.45rem] font-semibold text-[var(--bg)] no-underline transition-opacity duration-200 hover:opacity-85"
            onClick={closeMenu}
          >
            Hire Me
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="hidden cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-1"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-[transform,opacity] duration-200 ${
            menuOpen ? "translate-x-[5px] translate-y-[5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-[transform,opacity] duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-[transform,opacity] duration-200 ${
            menuOpen ? "translate-x-[5px] -translate-y-[5px] -rotate-45" : ""
          }`}
        />
      </button>
    </nav>
  );
};

export default NavbarSection;
