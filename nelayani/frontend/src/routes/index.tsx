import { useNavigationContext } from "../context/NavigationContext";
import { useAuthContext } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { FishermanLayout, PublicLayout } from "../layouts";
import { LoginRequiredModal } from "../components/common";

// Public pages
import {
  RoleSelectionPage,
  BuyerLoginPage,
  FishermanLoginPage,
  RegisterPage,
  HomePage,
  ProductsPage,
  ProductDetailPage,
  FishermenListPage,
  FishermanProfilePage,
  AIFreshnessPage,
} from "../pages/public";

// Buyer pages
import { UserDashboard, CartPage, CheckoutPage } from "../pages/buyer";

// Fisherman pages
import {
  FDashboardPage,
  FTodayCatchPage,
  NewCatchPage,
  FListingsPage,
  FOrdersPage,
  FSalesPage,
  FProfilePage,
  FSettingsPage,
} from "../pages/fisherman";

export default function Router() {
  const { page, navigate } = useNavigationContext();
  const { showLoginModal, setShowLoginModal } = useAppContext();

  const isFishermanPage = page.startsWith("f-");

  // Full-screen auth pages (no layout wrapper)
  if (page === "login") return <RoleSelectionPage />;
  if (page === "buyer-login") return <BuyerLoginPage />;
  if (page === "register") return <RegisterPage />;
  if (page === "f-fisherman-login") return <FishermanLoginPage />;

  // Fisherman pages — wrapped in FishermanLayout
  if (isFishermanPage) return (
    <FishermanLayout>
      {page === "f-dashboard" && <FDashboardPage />}
      {page === "f-today-catch" && <FTodayCatchPage />}
      {page === "f-new-catch" && <NewCatchPage />}
      {page === "f-listings" && <FListingsPage />}
      {page === "f-orders" && <FOrdersPage />}
      {page === "f-sales" && <FSalesPage />}
      {page === "f-profile" && <FProfilePage />}
      {page === "f-settings" && <FSettingsPage />}
    </FishermanLayout>
  );

  // Public/buyer pages — wrapped in PublicLayout with navbar
  return (
    <PublicLayout>
      {page === "home" && <HomePage />}
      {page === "products" && <ProductsPage />}
      {page === "product-detail" && <ProductDetailPage />}
      {page === "fishermen-list" && <FishermenListPage />}
      {page === "fisherman-profile" && <FishermanProfilePage />}
      {page === "ai-freshness" && <AIFreshnessPage />}
      {page === "cart" && <CartPage />}
      {page === "checkout" && <CheckoutPage />}
      {page === "user-dashboard" && <UserDashboard />}

      {/* Login required modal — rendered above everything */}
      {showLoginModal && (
        <LoginRequiredModal
          onClose={() => setShowLoginModal(false)}
          onLogin={() => { setShowLoginModal(false); navigate("buyer-login"); }}
          onRegister={() => { setShowLoginModal(false); navigate("register"); }}
        />
      )}
    </PublicLayout>
  );
}
