import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  Atom,
  ShieldQuestion,
  UsersRound,
  MessageSquareWarning,
  StickyNote,
  Award,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
import Joyride, { Step } from "react-joyride";

// This is sample data.
const data = {
  user: {
    name: "UserName",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mercury AI",
      logo: Atom,
      plan: "Enterprise",
    },
    /*{
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },*/
  ],
  navMain: [
    {
      title: "Feed",
      icon: StickyNote,
      isActive: true,
      items: [
        {
          title: "Feed",
          url: "/feed",
        },
        {
          title: "Create Post",
          url: "/CreatPost",
        },
        {
          title: "Liked Posts",
          url: "/Feed",
        },
        {
          title: "Trending Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Rewards",
      url: "#",
      icon: Award,
      items: [
        {
          title: "Leaderboard",
          url: "#",
        },
        {
          title: "Your Badges",
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "./Settings",
      icon: Settings,
      items: [
        {
          title: "Account Settings",
          url: "./Settings",
        },
        {
          title: "Notification Settings",
          url: "#",
        },
        {
          title: "Mode",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Guidelines/FAQ",
      url: "#",
      icon: ShieldQuestion,
    },
    {
      name: "Community Resources",
      url: "#",
      icon: UsersRound,
    },
    {
      name: "Report Content",
      url: "#",
      icon: MessageSquareWarning,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarMenu>
        <Link to="/Landing">
          <SidebarMenuButton>
            Mercury AI
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/gittalk">
          <SidebarMenuButton>
            GitTalk
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/docsense">
          <SidebarMenuButton>
            DocSense
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => {
            if (item.title === "GitTalk") {
              return { ...item, id: "gittalk" }; // Add id and class
            } else if (item.title === "DocSense") {
              return { ...item, id: "docsense" }; // Add id and class
            }
            return item;
          })}
        />

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}