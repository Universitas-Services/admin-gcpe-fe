"use client";

import { Bell, HelpCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/40 bg-white px-6">
      {/* Left: Sidebar toggle */}
      <SidebarTrigger className="-ml-2 text-gray-500 hover:text-gray-700" />
      <Separator orientation="vertical" className="h-5" />

      {/* Center: Spacer + Title */}
      <div className="flex-1">
        <h2 className="text-sm font-semibold text-[#005282]">
          Panel Administrativo
        </h2>
      </div>

      {/* Right: Quick actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <Bell className="h-[18px] w-[18px]" />
          {/* Notification dot */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <HelpCircle className="h-[18px] w-[18px]" />
        </Button>

        <div className="ml-2">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-[#005282] text-white text-xs font-semibold">
              AG
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
