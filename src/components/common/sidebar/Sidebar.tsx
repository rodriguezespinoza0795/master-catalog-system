"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronRight,
  Database,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useSidebar } from "./useSidebar";

const SidebarComponent = () => {
  const {
    modules,
    selectedModule,
    selectedSubcatalog,
    handleModuleSelect,
    openGroups,
    toggleGroup,
  } = useSidebar();

  return (
    <Sidebar variant="sidebar">
      <SidebarContent className="w-64 border-r bg-background gap-0">
        <div className="p-4 border-b h-16">
          <div className="flex items-center h-8 gap-2">
            <Database className="h-5 w-5" />
            <h1 className="font-bold">Master Catalog</h1>
          </div>
        </div>
        <ScrollArea className="flex-1 py-2">
          <div className="px-2">
            <button
              className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors ${
                !selectedModule
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            <div className="mt-6">
              <div className="px-3 mb-2 text-xs font-medium text-muted-foreground">
                CATALOGS
              </div>

              {/* Render modules with collapsible subcatalogs */}
              {modules.map((module) => (
                <Collapsible
                  key={module.id}
                  open={openGroups[module.id]}
                  onOpenChange={() => toggleGroup(module.id)}
                  className="w-full"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <module.icon className="h-4 w-4" />
                      <span>{module.name}</span>
                    </div>
                    {openGroups[module.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {module.subcatalogs?.map((subcatalog) => (
                      <button
                        key={subcatalog.id}
                        className={`flex items-center gap-3 w-full rounded-md pl-8 pr-3 py-2 text-sm transition-colors ${
                          selectedModule === module.id &&
                          selectedSubcatalog === subcatalog.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                        onClick={() =>
                          handleModuleSelect(module.id, subcatalog.id)
                        }
                      >
                        <subcatalog.icon className="h-4 w-4" />
                        <span>{subcatalog.name}</span>
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="mt-6">
              <div className="px-3 mb-2 text-xs font-medium text-muted-foreground">
                SYSTEM
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <button className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarComponent;
