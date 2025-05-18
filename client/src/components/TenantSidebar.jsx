import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cloud,
  Home,
  KeyRound,
  Search,
  CreditCard,
  MessageCircle,
  User
} from 'lucide-react';

const TenantSidebar = () => {
  const { pathname } = useLocation();
  const [highlightExplore, setHighlightExplore] = useState(false);

  useEffect(() => {
    if (pathname === '/tenant/explore') {
      setHighlightExplore(true);
      const timeout = setTimeout(() => setHighlightExplore(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  const links = [
    { to: '/tenant/dashboard',    label: 'Dashboard',        icon: <Home size={20}/> },
    { to: '/tenant/rentals',      label: 'My Rentals',       icon: <KeyRound size={20}/> },
    { to: '/tenant/explore',      label: 'Explore',          icon: <Search size={20}/> },
    { to: '/tenant/payments',     label: 'Payments',         icon: <CreditCard size={20}/> },
    { to: '/tenant/chat',         label: 'Chat',             icon: <MessageCircle size={20}/> },
    { to: '/tenant/profile',      label: 'Profile',          icon: <User size={20}/> },
  ];

  return (
    <aside className="
      w-64 h-screen
      bg-gradient-to-b from-blue-800 via-blue-900 to-blue-800
      text-white flex flex-col p-6
    ">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Cloud size={32} className="mr-2" />
        <span className="text-2xl font-bold">RentEase</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-3">
          {links.map(({ to, label, icon }) => {
            const isActive = pathname === to;
            const glow = isActive && to === '/tenant/explore' && highlightExplore;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition
                    ${isActive
                      ? `bg-blue-700 text-yellow-300 ${glow ? 'ring-2 ring-yellow-400 animate-pulse' : ''}`
                      : 'hover:bg-purple-800 hover:text-yellow-200'}
                  `}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default TenantSidebar;
