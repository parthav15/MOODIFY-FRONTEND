import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Profile', icon: '👤' },
    { path: '/dashboard/images', name: 'Uploaded Images', icon: '🖼️' },
    { path: '/dashboard/recommendations', name: 'Recommendations', icon: '🎵' },
    { path: '/dashboard/playlists', name: 'Playlists', icon: '📜' },
    { path: '/dashboard/settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white/5 backdrop-blur-lg border-r border-white/20 p-4">
      <h2 className="text-2xl font-bold text-white mb-6 px-4">Dashboard</h2>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/80 hover:bg-white/10'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;