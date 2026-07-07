import { createContext, useState, useContext } from "react";

interface AppContextValue {
  showLoginModal: boolean;
  setShowLoginModal: (v: boolean) => void;
  openLoginModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () => setShowLoginModal(true);

  return (
    <AppContext.Provider value={{ showLoginModal, setShowLoginModal, openLoginModal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
