import React from "react";

export type Page =
  | "home" | "products" | "product-detail" | "fishermen-list" | "fisherman-profile"
  | "ai-freshness"
  | "cart" | "checkout" | "user-dashboard"
  | "login" | "buyer-login" | "register"
  | "f-fisherman-login"
  | "f-dashboard" | "f-today-catch" | "f-new-catch" | "f-listings" | "f-orders"
  | "f-sales" | "f-analytics" | "f-profile" | "f-settings";

export type UserRole = "fisherman" | "buyer" | null;
export type RegisterRole = "fisherman" | "buyer";

export interface Product {
  id: number;
  name: string;
  weight: number;
  price: number;
  arrival: string;
  location: string;
  freshness: "Ultra Fresh" | "Very Fresh" | "Fresh";
  fisherman: string;
  fishermanId: number;
  category: string;
  image: string;
  description: string;
  depth: string;
  method: string;
  caught: string;
}

export interface Fisherman {
  id: number;
  name: string;
  rating: number;
  location: string;
  experience: number;
  avatar: string;
  catches: number;
  verified: boolean;
  bio: string;
  boat: string;
  specialties: string[];
  fishingArea: string;
  phone: string;
  email: string;
  reviewCount: number;
  joinDate: string;
  certifications: string[];
}

export interface FishermanReview {
  id: number;
  fishermanId: number;
  reviewer: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
}

export interface CartItem {
  product: Product;
  kg: number;
}

export interface OrderData {
  id: string;
  product: string;
  status: string;
  date: string;
  total: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  service: string;
  est: string;
  cost: number;
  abbr: string;
  bg: string;
}

export interface PaymentOption {
  id: string;
  group: string;
  name: string;
  sub: string;
  emoji: string;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  page: Page;
  badge?: number;
}
