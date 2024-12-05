import * as React from "react"
import { ChevronRight } from "lucide-react"
import { SearchForm } from "@/components/ui/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "User Settings",
      url: "#",
      items: [
        {
          title: "My Account",
          url: "Settings/profilepage",
        },
        {
          title: "Change Password",
          url: "#",
        },
        {
          title: "Team & Department",
          url: "#",
        },
        {
          title: "Privacy & Safety",
          url: "#",
        },
      ],
    },
    {
      title: "App Settings",
      url: "#",
      items: [
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Chat Bot",
          url: "#",
        },
        {
          title: "XXX",
          url: "#",
          isActive: true,
        },
        {
          title: "Advanced Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Help & About",
      url: "#",
      items: [
        {
          title: "Help",
          url: "#",
        },
        {
          title: "About",
          url: "#",
        },
        {
          title: "Log Out",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
