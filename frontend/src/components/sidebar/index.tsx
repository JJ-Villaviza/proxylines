import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { AppSidebarBody } from "./sidebar-body";
import { AppSidebarCompany } from "./sidebar-company";
import { AppSidebarUser } from "./sidebar-user";

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarCompany />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarBody />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
