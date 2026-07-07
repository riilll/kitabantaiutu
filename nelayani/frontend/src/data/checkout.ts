import { ShippingOption, PaymentOption } from "../types";

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "jnt",     name: "J&T Express",    service: "Regular",           est: "2–3 hari kerja",     cost: 15000, abbr: "J&T",  bg: "#E31837" },
  { id: "jne",     name: "JNE",            service: "REG",               est: "2–4 hari kerja",     cost: 18000, abbr: "JNE",  bg: "#E5001B" },
  { id: "sicepat", name: "SiCepat",        service: "REG",               est: "1–2 hari kerja",     cost: 20000, abbr: "SC",   bg: "#FF6B00" },
  { id: "pos",     name: "POS Indonesia",  service: "Kilat Khusus",      est: "3–5 hari kerja",     cost: 12000, abbr: "POS",  bg: "#CC0000" },
  { id: "sameday", name: "Same Day",       service: "Pengiriman Instan", est: "Hari ini (< 8 jam)", cost: 35000, abbr: "SD",   bg: "#0077B6" },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: "bca",     group: "Transfer Bank",  name: "BCA Virtual Account",     sub: "Bank Central Asia",       emoji: "🏦" },
  { id: "bri",     group: "Transfer Bank",  name: "BRI Virtual Account",     sub: "Bank Rakyat Indonesia",   emoji: "🏦" },
  { id: "mandiri", group: "Transfer Bank",  name: "Mandiri Virtual Account", sub: "Bank Mandiri",            emoji: "🏦" },
  { id: "qris",    group: "QRIS",           name: "QRIS",                    sub: "Scan QR dari semua app",  emoji: "📱" },
  { id: "gopay",   group: "E-Wallet",       name: "GoPay",                   sub: "Saldo GoPay",             emoji: "💚" },
  { id: "ovo",     group: "E-Wallet",       name: "OVO",                     sub: "Saldo OVO",               emoji: "💜" },
  { id: "dana",    group: "E-Wallet",       name: "DANA",                    sub: "Saldo DANA",              emoji: "💙" },
  { id: "cod",     group: "COD",            name: "Bayar di Tempat",         sub: "Dibayar saat tiba",       emoji: "💵" },
];
