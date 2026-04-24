'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  ChevronUp,
  LogOut,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const navItems = [
  {
    title: 'Panel de Control',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: Users,
    isUnderConstruction: true,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const handleUnderConstruction = () => {
    toast.info('Página en construcción', {
      description: 'Este módulo estará disponible próximamente.',
      duration: 3000,
    });
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-white">
      {/* Header */}
      <SidebarHeader className="px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0091be]/10">
            <LayoutDashboard className="h-5 w-5 text-[#0091be]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#005282] leading-tight">
              Universitas
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              Gestión Académica
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Contenido de Navegación */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    {item.isUnderConstruction ? (
                      <SidebarMenuButton
                        onClick={handleUnderConstruction}
                        isActive={isActive}
                        className={`h-10 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
                      >
                        <item.icon className="h-[18px] w-[18px] text-gray-400" />
                        <span className="text-[13px]">{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        className={`h-10 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-[#0091be]/10 text-[#0091be] font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`h-[18px] w-[18px] ${
                            isActive ? 'text-[#0091be]' : 'text-gray-400'
                          }`}
                        />
                        <span className="text-[13px]">{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer con DropdownMenu */}
      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-lg px-2 py-2 h-12 hover:bg-gray-50 cursor-pointer outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#0091be] text-white text-xs font-semibold">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-[13px] font-semibold text-gray-900">
                    Admin GCPE
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    admin@universitas.edu
                  </span>
                </div>
                <ChevronUp className="h-4 w-4 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56" align="start">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Ajustes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
