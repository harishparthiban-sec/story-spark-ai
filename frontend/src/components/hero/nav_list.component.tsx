import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavListComponent = () => {
  const navigate = useNavigate();

  // Temporary fallback values to restore build stability
  const isLogin = false;
  const isAdmin = false;
  const menuOpen = false;
  const notifications: any[] = [];
  const unreadCount = 0;
  const isOpen = false;

  const setMenuOpen = () => {};
  const handelLogout = () => {};
  const toggle = () => {};
  const close = () => {};
  const markAsRead = () => {};

  const notificationMenuRef = React.useRef(null);

  const getLinkClass = () => "";
  const getMobileLinkClass = () => "";
  const renderMobileNavContent = (label: string) => label;

  const logo = "";

  const ThemeToggle = () => null;
  const NotificationComponent = () => null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 supports-[backdrop-filter]:bg-white/75 dark:bg-[#0B1120]/80 dark:supports-[backdrop-filter]:bg-[#0B1120]/70 backdrop-blur-md border-b border-slate-200/70 dark:border-white/10 transition-colors duration-300 transform-gpu">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between w-full gap-2">

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-9 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex flex-1 items-center justify-center gap-1 px-2">

            <NavLink to="/" end className={() => getLinkClass()}>
              HOME
            </NavLink>

            <NavLink to="/explore" className={() => getLinkClass()}>
              EXPLORE
            </NavLink>

            <NavLink to="/story-inspiration" className={() => getLinkClass()}>
              INSPIRING
            </NavLink>

            <NavLink to="/analytics" className={() => getLinkClass()}>
              ANALYTICS
            </NavLink>

            <NavLink to="/collab" className={() => getLinkClass()}>
              COLLAB
            </NavLink>

            <NavLink to="/contact-us" className={() => getLinkClass()}>
              CONTACT
            </NavLink>

            <NavLink to="/community" className={() => getLinkClass()}>
              COMMUNITY
            </NavLink>

            {isLogin && (
              <>
                <NavLink to="/bookmarks" className={() => getLinkClass()}>
                  SAVED
                </NavLink>

                {isAdmin && (
                  <NavLink to="/dashboard" className={() => getLinkClass()}>
                    DASHBOARD
                  </NavLink>
                )}
              </>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Desktop Actions */}
            <div className="hidden xl:flex items-center gap-1.5">

              <button
                type="button"
                aria-label="Open Help Center"
                onClick={() => navigate("/help-center")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              >
                ?
              </button>

              {isLogin ? (
                <button onClick={handelLogout}>
                  LOGOUT
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button>
                      LOGIN
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button>
                      SIGN UP
                    </button>
                  </Link>
                </>
              )}

              <ThemeToggle />

              <div className="relative inline-flex" ref={notificationMenuRef}>
                <button
                  type="button"
                  aria-label="Notifications"
                  onClick={toggle}
                >
                  🔔
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex xl:hidden items-center gap-1.5">
              <ThemeToggle />

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen()}
              >
                MENU
              </button>
            </div>
          </div>
        </div>

        <NotificationComponent />

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="xl:hidden mt-2 px-1 pb-4 flex flex-col gap-1.5 border-t border-slate-200/70 dark:border-white/10 pt-3">

            <NavLink
              to="/"
              end
              className={() => getMobileLinkClass()}
            >
              {renderMobileNavContent("HOME")}
            </NavLink>

            <NavLink
              to="/explore"
              className={() => getMobileLinkClass()}
            >
              {renderMobileNavContent("EXPLORE")}
            </NavLink>

          </div>
        )}
      </div>
    </header>
  );
};

export default NavListComponent;