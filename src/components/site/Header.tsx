import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-luxe grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-honey to-honey-deep text-charcoal shadow-md">
            <HexIcon />
          </span>
          <span className="font-display truncate text-xl font-semibold tracking-tight text-charcoal">
            Honeyfield
            <span className="text-honey-deep">.</span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-charcoal"
              activeProps={{ className: "text-charcoal bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+254711856795" className="btn-honey text-sm">
            <Phone className="h-4 w-4" />
            +254 711 856 795
          </a>
        </div>

        <button
          aria-label="Open menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-charcoal md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-luxe mt-3 rounded-3xl border border-border bg-background p-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80"
                  activeProps={{ className: "bg-secondary text-charcoal" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a href="tel:+254711856795" className="btn-honey mt-3 text-sm">
                <Phone className="h-4 w-4" />
                Call +254 711 856 795
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function HexIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
      <path d="M12 8 L17 10.5 V15.5 L12 18 L7 15.5 V10.5 Z" />
    </svg>
  );
}