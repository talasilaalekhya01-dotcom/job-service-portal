import { Outlet } from "@tanstack/react-router";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
