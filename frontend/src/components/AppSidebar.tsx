// src/components/app-sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, BellIcon, MagnifyingGlassCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export const AppSidebar: React.FC = () => {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-full fixed left-0 top-0 p-4">
      <nav>
        <ul>
          <li>
            <Link to="/" className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/feed" className="flex items-center space-x-2">
              <MagnifyingGlassCircleIcon className="h-6 w-6" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <button aria-label="Add" className="flex items-center space-x-2">
              <PlusCircleIcon className="h-6 w-6" />
              <span>Add</span>
            </button>
          </li>
          <li>
            <button aria-label="Notifications" className="flex items-center space-x-2">
              <BellIcon className="h-6 w-6" />
              <span>Notifications</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
