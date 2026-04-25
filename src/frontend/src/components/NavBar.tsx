import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { UserRole } from "../types";
import type { Employer, JobSeeker } from "../types";

function getInitials(user: JobSeeker | Employer | null): string {
  if (!user) return "?";
  if ("name" in user) return user.name.slice(0, 2).toUpperCase();
  if ("companyName" in user) return user.companyName.slice(0, 2).toUpperCase();
  return "?";
}

function getDisplayName(user: JobSeeker | Employer | null): string {
  if (!user) return "";
  if ("name" in user) return user.name;
  if ("companyName" in user) return user.companyName;
  return "";
}

export default function NavBar() {
  const { currentUser, userRole, isAuthenticated, login, logout, isLoading } =
    useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const isSeeker = userRole === UserRole.JobSeeker;
  const isEmployer = userRole === UserRole.Employer;

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
    setMobileOpen(false);
  };

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <Link
        to="/jobs"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        activeProps={{ className: "text-primary font-semibold" }}
        onClick={onNavigate}
        data-ocid="nav.jobs_link"
      >
        Browse Jobs
      </Link>
      {isSeeker && (
        <>
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            activeProps={{ className: "text-primary font-semibold" }}
            onClick={onNavigate}
            data-ocid="nav.profile_link"
          >
            My Profile
          </Link>
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            onClick={onNavigate}
            data-ocid="nav.applications_link"
          >
            My Applications
          </Link>
        </>
      )}
      {isEmployer && (
        <>
          <Link
            to="/employer/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            activeProps={{ className: "text-primary font-semibold" }}
            onClick={onNavigate}
            data-ocid="nav.dashboard_link"
          >
            Dashboard
          </Link>
          <Link
            to="/employer/post-job"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            activeProps={{ className: "text-primary font-semibold" }}
            onClick={onNavigate}
            data-ocid="nav.post_job_link"
          >
            Post a Job
          </Link>
        </>
      )}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="nav.header"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight">
            JobPortal
          </span>
        </Link>

        {/* Desktop nav links — center */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <NavLinks />
        </nav>

        {/* Right side: Auth */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && userRole !== null ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 hover:bg-muted rounded-lg h-9"
                  data-ocid="nav.user_menu_button"
                >
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {getInitials(currentUser)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">
                    {getDisplayName(currentUser) || "Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48"
                data-ocid="nav.user_dropdown"
              >
                {isSeeker && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2"
                        data-ocid="nav.profile_menu_item"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2"
                        data-ocid="nav.applications_menu_item"
                      >
                        <FileText className="w-4 h-4" /> My Applications
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {isEmployer && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/employer/dashboard"
                        className="flex items-center gap-2"
                        data-ocid="nav.dashboard_menu_item"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/employer/post-job"
                        className="flex items-center gap-2"
                        data-ocid="nav.post_job_menu_item"
                      >
                        <PlusCircle className="w-4 h-4" /> Post a Job
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive flex items-center gap-2 cursor-pointer"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isAuthenticated ? (
            // Authenticated but no role yet (needs registration)
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="nav.register_button"
                >
                  Complete Profile
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground"
                data-ocid="nav.logout_button"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => login()}
                className="hidden sm:flex"
                data-ocid="nav.login_button"
              >
                Sign In
              </Button>
              <Link to="/auth">
                <Button size="sm" data-ocid="nav.register_cta_button">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
                data-ocid="nav.mobile_menu_button"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 pt-12"
              data-ocid="nav.mobile_sheet"
            >
              <nav className="flex flex-col gap-4 px-2">
                <NavLinks onNavigate={() => setMobileOpen(false)} />
                {!isAuthenticated && (
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.mobile_login_button"
                    >
                      Sign In
                    </Button>
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>
                      <Button
                        className="w-full"
                        data-ocid="nav.mobile_register_button"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-destructive"
                      data-ocid="nav.mobile_logout_button"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
