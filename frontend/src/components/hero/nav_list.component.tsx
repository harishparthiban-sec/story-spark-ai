import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import ThemeToggle from "../theme/theme_toggle.component";
import NotificationComponent from "../notification/notification.component";
import { useGetNotificationsQuery } from "../../redux/apis/notification.api";
import { isLoggedIn, getUserInfo } from "../../services/auth.service";
import toast from "react-hot-toast";
import { USER_ROLE } from "../../constants/role";

interface Notification {
  id: string;
  isRead: boolean;
  message?: string;
}

const NavListComponent = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const user = getUserInfo();
  const isLogin = isLoggedIn();
  const isAdmin = user?.role === USER_ROLE.ADMIN || user?.role === USER_ROLE.SUPER_ADMIN;

  const { data: notificationsData } = useGetNotificationsQuery(undefined, {
    skip: !isLogin,
  });

  const notifications: Notification[] = notificationsData?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const markAsRead = (notificationId: string) => {
    // Handle mark as read logic
  };

  const getLinkClass = (isActive: boolean) => {
    return `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 ${
      isActive
        ? "bg-blue-50/80 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5"
    }`;
  };

  const getMobileLinkClass = (isActive: boolean) => {
    return `block rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-blue-50/80 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5"
    }`;
  };

  const renderMobileNavContent = (label: string, isActive: boolean) => (
    <>
      {isActive && (
        <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
      )}
      <span>{label}</span>
    </>
  );

  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
          <NavLink to="/" end className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-house" />
                HOME
              </>
            )}
          </NavLink>

          <NavLink to="/explore" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-compass" />
                EXPLORE
              </>
            )}
          </NavLink>

          <NavLink to="/story-inspiration" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-book-open" />
                INSPIRING
              </>
            )}
          </NavLink>

          <NavLink to="/analytics" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-custom animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-chart-column" />
                ANALYTICS
              </>
            )}
          </NavLink>

          <NavLink to="/collab" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-custom animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-pen-nib" />
                COLLAB
              </>
            )}
          </NavLink>

          <NavLink to="/contact-us" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-envelope" />
                CONTACT
              </>
            )}
          </NavLink>

          <NavLink to="/community" className={({ isActive }) => getLinkClass(isActive)}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                )}
                <i className="fa-solid fa-users" />
                COMMUNITY
              </>
            )}
          </NavLink>

          {isLogin && (
            <>
              <NavLink to="/bookmarks" className={({ isActive }) => getLinkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    )}
                    <i className="fa-solid fa-bookmark" />
                    SAVED
                  </>
                )}
              </NavLink>

              {isAdmin && (
                <NavLink to="/dashboard" className={({ isActive }) => getLinkClass(isActive)}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-custom rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                      )}
                      <i className="fa-solid fa-table-columns" />
                      DASHBOARD
                    </>
                  )}
                </NavLink>
              )}
            </>
          )}
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";
import ThemeToggle from "../theme/theme_toggle.component";

const NavListComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = () => {
    removeUserInfo();
    setLoggedIn(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? "text-white bg-slate-800/70" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0B1120]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-slate-800 dark:text-white">StorySparkAI</Link>
        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/story-inspiration" className={linkClass}>Stories</NavLink>
          <NavLink to="/community" className={linkClass}>Community</NavLink>
          {loggedIn && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loggedIn ? (
            <button onClick={handleLogout} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Logout</button>
          ) : (
            <Link to="/login" className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Login</Link>
          )}
          <button className="rounded-md px-2 py-1 text-slate-700 lg:hidden dark:text-slate-200" onClick={() => setMenuOpen((v) => !v)}>
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="space-y-1 border-t border-slate-200/70 px-4 py-3 lg:hidden dark:border-white/10">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/story-inspiration" className={linkClass}>Stories</NavLink>
          <NavLink to="/community" className={linkClass}>Community</NavLink>
        </div>
      )}
    </div>
  </header>
  );
};

export default NavListComponent;
    </header>
  );
};

export default NavListComponent;
