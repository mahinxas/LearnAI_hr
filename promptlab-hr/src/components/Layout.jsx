import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Home,
  LogIn,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  User,
  X,
} from 'lucide-react';
import { navItems } from '@/data/content';
import { useAuth } from '@/features/auth/AuthProvider';
import { useProgressStore } from '@/features/progress/progressStore';
import { useOnlineStatus } from '@/lib/capabilities';
import Logo from '@/components/Logo';

const navIcons = {
  home: Home,
  purpose: Target,
  learning: BookOpen,
  builder: Sparkles,
  safety: ShieldCheck,
  progress: BarChart3,
};

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, logOut, loading } = useAuth();
  const online = useOnlineStatus();
  const { pathname } = useLocation();
  const darkMode = useProgressStore((s) => s.darkMode);
  const toggleDarkMode = useProgressStore((s) => s.toggleDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const goHome = () => {
    setOpen(false);
  };

  const handleNavClick = (event, path) => {
    setOpen(false);

    if (path === pathname) {
      event.preventDefault();
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment-50 dark:bg-midnight-900">
        <div className="flex flex-col items-center gap-4">
          <Logo size="md" />
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-2 w-2 rounded-full bg-coral-500"
                style={{ animation: `lairnBounce 1.2s ease-in-out ${d * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-midnight-900 transition-colors duration-200">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-midnight-100 dark:border-midnight-700 bg-midnight-950 text-parchment-100 transition-all duration-300 lg:translate-x-0 ${
          collapsed ? 'lg:w-20' : 'lg:w-60'
        } ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`flex h-full flex-col py-8 ${collapsed ? 'lg:px-3' : 'lg:px-5'} px-6`}>
          <Link
            to="/"
            className="mb-10 flex flex-col gap-1 lg:hidden"
            onClick={goHome}
          >
            <Logo dark size="md" />
            <div className="text-[11px] uppercase tracking-[0.18em] text-midnight-300">
              Conscious AI · v1.0
            </div>
          </Link>

          <button
            onClick={() => setCollapsed((value) => !value)}
            className={`mb-8 hidden h-10 items-center rounded-xl border border-midnight-700 bg-midnight-900 text-sm text-midnight-200 transition-colors hover:bg-midnight-800 hover:text-parchment-50 lg:flex ${
              collapsed ? 'w-full justify-center' : 'justify-between px-3'
            }`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <>
                <span className="font-medium">Navigation</span>
                <PanelLeftClose size={18} />
              </>
            )}
          </button>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                onClick={(event) => handleNavClick(event, item.path)}
                title={item.label}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl py-3 text-sm transition-all ${
                    collapsed ? 'lg:justify-center lg:px-0' : 'justify-between px-4'
                  } ${
                    isActive
                      ? 'bg-white/20 text-parchment-50 font-medium'
                      : 'text-midnight-300 hover:bg-white/10 hover:text-parchment-50'
                  }`
                }
              >
                {({ isActive }) => {
                  const Icon = navIcons[item.id];
                  return (
                    <>
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          size={18}
                          className={`shrink-0 ${isActive ? 'text-coral-300' : 'text-midnight-400 group-hover:text-parchment-100'}`}
                        />
                        <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
                          {item.label}
                        </span>
                      </span>
                      <span
                        className={`opacity-0 transition-opacity group-hover:opacity-100 ${
                          collapsed ? 'lg:hidden' : ''
                        }`}
                      >
                        →
                      </span>
                    </>
                  );
                }}
              </NavLink>
            ))}
          </nav>

          <div
            className={`mt-auto rounded-2xl border border-midnight-700 bg-midnight-900 p-4 ${
              collapsed ? 'lg:hidden' : ''
            }`}
          >
            <p className="font-display text-sm italic text-parchment-200">
              "AI prepares structure. The recruiter remains responsible."
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-midnight-400">
              House rule · §1
            </p>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-midnight-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <main className={`transition-[margin] duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <header className="sticky top-0 z-20 border-b border-midnight-100 dark:border-midnight-700 bg-parchment-50/85 dark:bg-midnight-900/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 text-midnight-950 dark:text-parchment-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>

              <Link to="/" className="shrink-0" aria-label="LeAIrn HR home" onClick={goHome}>
                <Logo size="sm" iconOnly />
              </Link>

              <span className="hidden h-1 w-1 shrink-0 rounded-full bg-midnight-300 dark:bg-midnight-600 md:block" />
              <span className="eyebrow hidden truncate !text-midnight-700 dark:!text-midnight-300 md:block">
                Educational platform · not a hiring decision tool
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!online && (
                <span className="hidden rounded-full border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-500 dark:text-midnight-300 md:inline-flex">
                  Offline mode
                </span>
              )}

              <button
                onClick={toggleDarkMode}
                className="grid h-9 w-9 place-items-center rounded-xl border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 text-midnight-600 dark:text-parchment-300 transition-all hover:border-midnight-400 dark:hover:border-midnight-500"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={darkMode ? 'Light mode' : 'Dark mode'}
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 rounded-full border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 px-3 py-1.5 text-sm sm:flex">
                    <User size={14} className="text-midnight-500 dark:text-midnight-300" />
                    <span className="font-medium text-midnight-900 dark:text-parchment-100">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={logOut}
                    className="btn-ghost"
                    aria-label="Log out"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">Log out</span>
                  </button>
                </div>
              ) : online ? (
                <Link to="/login" className="btn-secondary !py-2 !px-4 !text-sm">
                  <LogIn size={14} /> Sign in
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn-secondary !py-2 !px-4 !text-sm opacity-60"
                  disabled
                  title="Sign in requires an internet connection"
                >
                  <LogIn size={14} /> Sign in
                </button>
              )}
            </div>
          </div>
        </header>

        <Outlet />

        <footer className="border-t border-midnight-100 dark:border-midnight-700 bg-parchment-100/40 dark:bg-midnight-800/40 px-6 py-10 md:px-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <p className="text-sm text-midnight-600 dark:text-midnight-300">
                © {new Date().getFullYear()} LeAIrn HR · Educational use only.
              </p>
            </div>
            <p className="max-w-md text-xs text-midnight-500 dark:text-midnight-400">
              This platform teaches structured AI use. It does not store CV data on
              behalf of users and does not automate hiring decisions.
            </p>
          </div>
        </footer>
      </main>

      <button
        onClick={() => setOpen(false)}
        className={`fixed right-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-xl bg-parchment-50 dark:bg-midnight-800 text-midnight-950 dark:text-parchment-100 shadow-lift lg:hidden ${
          open ? 'block' : 'hidden'
        }`}
        aria-label="Close menu"
      >
        <X size={18} />
      </button>
    </div>
  );
}
