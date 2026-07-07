import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { AppProvider, useAppContext } from '../context/AppContext';
import { NavigationProvider } from '../context/NavigationContext';
import Router from '../routes';
import '../styles/fonts.css';

function AppInner() {
  const { openLoginModal } = useAppContext();
  return (
    <CartProvider onRequireAuth={openLoginModal}>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </CartProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </AuthProvider>
  );
}
