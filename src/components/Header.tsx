import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import {
  Home,
  Menu,
  // Network,
  // Store,
  X,
} from 'lucide-react'
import { Heart } from 'lucide-react'
import { useFavouritesCount } from '@/stores/favourites'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const favouritesCount = useFavouritesCount()
 

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
           Home
          </Link>
        </h1>
        <nav className="ml-auto flex items-center gap-4" aria-label="Main navigation">
          <Link to={"/favourites" as any} className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Heart size={18} className={favouritesCount > 0 ? 'text-red-400' : 'text-white'} />
            <span>Favourites</span>
            <span className="ml-1 inline-flex items-center justify-center min-w-6 h-6 text-sm rounded-full bg-red-600 px-2">
              {favouritesCount}
            </span>
          </Link>
        </nav>
      </header>
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        aria-label="Sidebar navigation"
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </header>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            {/* Add more navigation links as <li> if needed */}
          </ul>
        </nav>
      </aside>
    </>
  )
}
