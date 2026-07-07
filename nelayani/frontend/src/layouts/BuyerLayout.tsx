import { NavBar } from "../components/common";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {children}
    </div>
  );
}
