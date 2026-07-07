import { NavBar } from "../components/common";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {children}
    </div>
  );
}
