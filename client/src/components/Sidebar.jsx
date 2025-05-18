import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cloud,
  Home,
  Archive,
  PlusCircle,
  Inbox,
  CreditCard,
  MessageCircle,
  User
} from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  // track when to show the glow on the properties link
  const [highlightProp, setHighlightProp] = useState(false);

  useEffect(() => {
    if (pathname === '/owner/properties') {
      setHighlightProp(true);
      const t = setTimeout(() => setHighlightProp(false), 2000); // glow for 2s
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const links = [
    { to: '/owner/dashboard',    label: 'Dashboard',       icon: <Home size={20}/> },
    { to: '/owner/properties',   label: 'My Properties',   icon: <Archive size={20}/> },
    { to: '/owner/add-property', label: 'Add Property',    icon: <PlusCircle size={20}/> },
    { to: '/owner/requests',     label: 'Rental Requests', icon: <Inbox size={20}/> },
    { to: '/owner/payments',     label: 'Payments',        icon: <CreditCard size={20}/> },
    { to: '/owner/chat',         label: 'Chat',            icon: <MessageCircle size={20}/> },
    { to: '/owner/profile',      label: 'Profile',         icon: <User size={20}/> },
  ];

  return (
    <aside className="
      w-64 h-screen
      bg-gradient-to-b from-blue-800 via-blue-900 to-blue-800
      text-white flex flex-col p-6
    ">
      {/* RentEase logo */}
      <div className="flex items-center mb-8">
        <Cloud size={32} className="mr-2" />
        <span className="text-2xl font-bold">RentEase</span>
      </div>

      {/* nav */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-3">
          {links.map(({ to, label, icon }) => {
            const isActive = pathname === to;
            // when on /owner/properties, we want that link to glow once
            const glow = isActive && to === '/owner/properties' && highlightProp;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition
                    ${isActive
                      ? `bg-blue-700 text-yellow-300 ${glow ? 'ring-2 ring-yellow-400 animate-pulse' : ''}`
                      : 'hover:bg-blue-800 hover:text-yellow-200'
                    }
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

export default Sidebar;
