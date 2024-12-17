import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500';
      case 'manager':
        return 'bg-blue-500';
      case 'cashier':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-4 gap-2">
              <div className="flex items-center gap-2 md:gap-4">
                <SidebarTrigger>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                {user && (
                  <Badge className={`${getRoleColor(user.role)} text-white text-xs md:text-sm whitespace-nowrap`}>
                    {user.role}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                size="sm"
                className="gap-1 md:gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}