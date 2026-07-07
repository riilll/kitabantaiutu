import { createContext, useState, useContext } from "react";
import { Page, Product, Fisherman } from "../types";

interface NavigationContextValue {
  page: Page;
  navigate: (p: Page) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedFisherman: Fisherman | null;
  setSelectedFisherman: (f: Fisherman | null) => void;
  productBackPage: Page;
  setProductBackPage: (p: Page) => void;
  openProductDetail: (p: Product, from: Page) => void;
  fishermanSearch: string;
  setFishermanSearch: (v: string) => void;
  fishermanFilter: string;
  setFishermanFilter: (v: string) => void;
  fishermanSort: string;
  setFishermanSort: (v: string) => void;
  fishermanListScroll: number;
  setFishermanListScroll: (n: number) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("login");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFisherman, setSelectedFisherman] = useState<Fisherman | null>(null);
  const [productBackPage, setProductBackPage] = useState<Page>("home");
  const [fishermanSearch, setFishermanSearch] = useState("");
  const [fishermanFilter, setFishermanFilter] = useState("Semua");
  const [fishermanSort, setFishermanSort] = useState("popular");
  const [fishermanListScroll, setFishermanListScroll] = useState(0);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const openProductDetail = (p: Product, from: Page) => {
    setSelectedProduct(p);
    setProductBackPage(from);
    navigate("product-detail");
  };

  return (
    <NavigationContext.Provider value={{
      page, navigate,
      selectedProduct, setSelectedProduct,
      selectedFisherman, setSelectedFisherman,
      productBackPage, setProductBackPage,
      openProductDetail,
      fishermanSearch, setFishermanSearch,
      fishermanFilter, setFishermanFilter,
      fishermanSort, setFishermanSort,
      fishermanListScroll, setFishermanListScroll,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigationContext must be used within NavigationProvider");
  return ctx;
}
