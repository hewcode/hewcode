import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useHewcode } from '../../contexts/hewcode-context';
import { IconRegistry } from '../icon-registry';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

const footerNavItems: NavItem[] = [
  // {
  //   title: 'Documentation',
  //   href: 'https://laravel.com/docs/starter-kits#react',
  //   icon: BookOpen,
  // },
];

export function AppSidebar() {
  const { hewcode } = useHewcode();

  return (
    <>
      <IconRegistry icons={hewcode?.navigation?.icons || {}} />
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href={dashboard()} prefetch>
                  <AppLogo />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavMain items={hewcode?.navigation?.items || []} />
        </SidebarContent>

        <SidebarFooter>
          <NavFooter items={footerNavItems} className="mt-auto" />
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
