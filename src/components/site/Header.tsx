import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

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
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Ntarakwai logo"
            className="h-11 w-11 rounded-full border border-border/30 bg-background object-contain p-1 shadow-md"
            width={44}
            height={44}
          />
          <span className="font-display truncate text-xl font-semibold tracking-tight text-charcoal">
            Ntarakwai pure & Natural Honey
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
            0711856795
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
                Call 0711856795
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
