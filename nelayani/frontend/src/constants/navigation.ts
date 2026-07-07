import React from "react";
import { Home, Fish, Plus, List, ShoppingBag, User, Settings } from "lucide-react";
import { NavItem, Page } from "../types";

export const F_NAV: NavItem[] = [
  { label: "Dashboard",        icon: React.createElement(Home, { style: { width: 18, height: 18 } }),        page: "f-dashboard" as Page },
  { label: "Tangkapan Saya",   icon: React.createElement(Fish, { style: { width: 18, height: 18 } }),        page: "f-today-catch" as Page },
  { label: "Tambah Tangkapan", icon: React.createElement(Plus, { style: { width: 18, height: 18 } }),        page: "f-new-catch" as Page },
  { label: "Produk Saya",      icon: React.createElement(List, { style: { width: 18, height: 18 } }),        page: "f-listings" as Page },
  { label: "Pesanan",          icon: React.createElement(ShoppingBag, { style: { width: 18, height: 18 } }), page: "f-orders" as Page, badge: 3 },
];

export const F_NAV2: NavItem[] = [
  { label: "Profil Saya", icon: React.createElement(User, { style: { width: 18, height: 18 } }),     page: "f-profile" as Page },
  { label: "Pengaturan",  icon: React.createElement(Settings, { style: { width: 18, height: 18 } }), page: "f-settings" as Page },
];
