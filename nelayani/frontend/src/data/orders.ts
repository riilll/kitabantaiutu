import { OrderData } from "../types";

export const ORDERS_DATA: OrderData[] = [
  { id: "MF-2401", product: "Kakap Merah 2kg", status: "Delivered", date: "Jun 22, 2026", total: 170000 },
  { id: "MF-2389", product: "Udang Windu 1kg", status: "In Transit", date: "Jun 23, 2026", total: 150000 },
  { id: "MF-2378", product: "Tuna Sirip Kuning 3kg", status: "Delivered", date: "Jun 20, 2026", total: 195000 },
  { id: "MF-2365", product: "Cumi-Cumi Segar 2kg", status: "Delivered", date: "Jun 18, 2026", total: 150000 },
];

export const REVENUE_DATA: { month: string; revenue: number }[] = [
  { month: "Jan", revenue: 42 }, { month: "Feb", revenue: 58 },
  { month: "Mar", revenue: 49 }, { month: "Apr", revenue: 72 },
  { month: "May", revenue: 68 }, { month: "Jun", revenue: 91 }
];
