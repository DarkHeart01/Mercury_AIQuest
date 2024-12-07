import * as React from "react"
import {
  Atom,
  ShieldQuestion,
  UsersRound,
  MessageSquareWarning,
  StickyNote,
  Award,
  Settings,
} from "lucide-react";

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
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

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
          url: "#/Feed",
        },
        {
          title: "Create Post",
          url: "#/CreatePost",
        },
        {
          title: "Trending Posts",
          url: "#/Feed/Trending",
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
          <SidebarMenuButton className="joyride-gittalk">
            GitTalk
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/docsense">
          <SidebarMenuButton className="joyride-docsense">
            DocSense
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/DataBloom">
          <SidebarMenuButton className="joyride-batabloom">
            DataBloom
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/Sharebase">
          <SidebarMenuButton className="joyride-wiki">
            ShareBase
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/Contribute">
          <SidebarMenuButton className="joyride-contribute">
            Contribute
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarMenu>
        <Link to="/Analytics" className="joyride-analytics">
          <SidebarMenuButton>
            Analytics
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => {
            if (item.title === "Feed") {
              return { ...item, className: "joyride-feed" }; // Correct key casing
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