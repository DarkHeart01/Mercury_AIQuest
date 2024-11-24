import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  BellIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import "@/pages/Feed.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

export default function Feed({ children }: { children: React.ReactNode }) {
  const handleIconClick = () => {
    // Placeholder for future functionality, currently does nothing.
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {/* Add Search Bar with Plus Circle Icon */}
        <div className="search-bar-container relative border-2 border-black">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar focus:ring-0 focus:border-black outline-none"
          />
          {/*Adding Search Icon*/}
          <MagnifyingGlassCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500"/>
          <button
            onClick={handleIconClick}
            className="absolute right-16 top-1/2 transform -translate-y-1/2"
            aria-label="Add"
          >
            <PlusCircleIcon className="h-8 w-8 text-black strokeWidth={1} " />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute right-8 top-1/2 transform -translate-y-1/2"
            aria-label="Notifications"
          >
            <BellIcon className="h-8 w-8 text-black" />
          </button>
        </div>

        {/* Add Full-Width Card 1 */}
        <div className="full-width-card relative">
          <button
            onClick={handleIconClick}
            className="absolute top-1 left-0"
            aria-label="Arrow Up"
          >
            <ArrowUpCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-1 left-0"
            aria-label="Arrow Down"
          >
            <ArrowDownCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-0 right-0"
            aria-label="Arrow Right"
          >
            <ArrowRightIcon className="h-8 w-8 text-black" />
          </button>
          <div className="relative -top-2">
            <h2 className="card-title">Post Title</h2>
            <p className="card-content">
              This is a full-width card. You can use it to display
              announcements, summaries, or other info.
            </p>
          </div>
        </div>

        {/* Add Full-Width Card 2 */}
        <div className="full-width-card relative">
          <button
            onClick={handleIconClick}
            className="absolute top-1 left-0"
            aria-label="Arrow Up"
          >
            <ArrowUpCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-1 left-0"
            aria-label="Arrow Down"
          >
            <ArrowDownCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-0 right-0"
            aria-label="Arrow Right"
          >
            <ArrowRightIcon className="h-8 w-8 text-black" />
          </button>
          <div className="relative -top-2">
            <h2 className="card-title">Post Title</h2>
            <p className="card-content">
              This is a full-width card. You can use it to display
              announcements, summaries, or other info.
            </p>
          </div>
        </div>

        {/* Add Full-Width Card 3 */}
        <div className="full-width-card relative">
          <button
            onClick={handleIconClick}
            className="absolute top-1 left-0"
            aria-label="Arrow Up"
          >
            <ArrowUpCircleIcon className="h-8 w-8 text-black-400" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-1 left-0"
            aria-label="Arrow Down"
          >
            <ArrowDownCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-0 right-0"
            aria-label="Arrow Right"
          >
            <ArrowRightIcon className="h-8 w-8 text-black" />
          </button>
          <div className="relative -top-2">
            <h2 className="card-title">Post Title</h2>
            <p className="card-content">
              This is a full-width card. You can use it to display
              announcements, summaries, or other info.
            </p>
          </div>
        </div>

        {/* Add Full-Width Card 4 */}
        <div className="full-width-card relative">
          <button
            onClick={handleIconClick}
            className="absolute top-1 left-0"
            aria-label="Arrow Up"
          >
            <ArrowUpCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-1 left-0"
            aria-label="Arrow Down"
          >
            <ArrowDownCircleIcon className="h-8 w-8 text-black" />
          </button>
          <button
            onClick={handleIconClick}
            className="absolute bottom-0 right-0"
            aria-label="Arrow Right"
          >
            <ArrowRightIcon className="h-8 w-8 text-black" />
          </button>
          <div className="relative -top-2">
            <h2 className="card-title">Post Title</h2>
            <p className="card-content">
              This is a full-width card. You can use it to display
              announcements, summaries, or other info.
            </p>
          </div>
        </div>

        {children}

        {/* Footer Section */}
        <footer className="footer bg-gray-200 text-black py-2 text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Mercury AI. All rights reserved.</p>
          {/*<div className="mt-2">
            <a href="/privacy-policy" className="text-black hover:text-gray-400 mx-2">Privacy Policy</a>
            <a href="/terms-of-service" className="text-black hover:text-gray-400 mx-2">Terms of Service</a>
            <a href="/contact-us" className="text-black hover:text-gray-400 mx-2">Contact Us</a>
          </div>*/}
        </footer>
      </main>
    </SidebarProvider>
  );
}