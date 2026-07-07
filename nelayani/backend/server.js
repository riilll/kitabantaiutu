const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors()); 
// Tambahkan limit: '50mb' agar bisa menerima file foto base64 yang besar
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- DATABASE SEMENTARA (Mock Data) ---
let fishermanProfile = {
  name: "Ahmad Rasyid",
  email: "ahmad.rasyid@nelayan.id",
  phone: "081234567890",
  location: "Pelabuhan Lampulo, Banda Aceh",
  boat: "Bintang Laut Baru"
};

// Penampung data array
let products = [];            // Menyimpan tangkapan baru
let orders = [];              // Menyimpan data pesanan
let follows = [];             // Menyimpan data follow: { buyerEmail: "aku@gmail.com", fishermanId: 1 }
let registeredFishermen = []; // Menyimpan nelayan yang baru mendaftar

// --- ROUTES / ENDPOINTS ---

// 1. Cek status server
app.get('/', (req, res) => {
  res.send('Backend MarineFresh berjalan lancar!');
});

// ==========================================
// ENDPOINT: NELAYAN BARU (REGISTER)
// ==========================================
app.get('/api/fishermen', (req, res) => {
  res.json(registeredFishermen);
});

app.post('/api/fishermen', (req, res) => {
  const newFisherman = {
    id: Date.now(), // Buat ID unik berdasarkan waktu
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location || "Indonesia",
    boat: req.body.boat || "Kapal Pribadi",
    fishingArea: req.body.fishingArea || "Perairan Lokal",
    experience: 0,
    catches: 0,
    rating: 0,
    reviewCount: 0,
    verified: false, // Default belum terverifikasi centang hijau
    joinDate: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", // Foto profil default
    specialties: ["Seafood Segar"],
    bio: "Nelayan baru yang bergabung dengan komunitas Nelayani."
  };
  
  registeredFishermen.push(newFisherman);
  res.status(201).json({ message: "Nelayan berhasil didaftarkan!", data: newFisherman });
});

// ==========================================
// ENDPOINT: PRODUK / TANGKAPAN
// ==========================================
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.unshift(newProduct); // Pakai unshift agar tangkapan terbaru berada di posisi paling atas
  res.status(201).json({ message: "Tangkapan berhasil dipublikasikan!", data: newProduct });
});

// ==========================================
// ENDPOINT: PESANAN (ORDERS)
// ==========================================
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    ...req.body,
    // Buat tanggal otomatis dari server
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
  };
  orders.unshift(newOrder); // Masukkan pesanan terbaru di posisi paling atas
  res.json({ message: "Pesanan berhasil dibuat!", data: newOrder });
});

// ==========================================
// ENDPOINT: FOLLOW NELAYAN
// ==========================================

// ==========================================
// ENDPOINT: EDIT & HAPUS PRODUK
// ==========================================
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index !== -1) {
    // Perbarui data produk yang ada dengan data baru dari frontend
    products[index] = { ...products[index], ...req.body };
    res.json({ message: "Produk berhasil diperbarui!", data: products[index] });
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Saring dan buang produk dengan ID yang cocok
  products = products.filter(p => p.id !== id);
  res.json({ message: "Produk berhasil dihapus!" });
});

app.get('/api/follows/:email', (req, res) => {
  const email = req.params.email;
  // Cari semua nelayan yang difollow oleh email pembeli ini
  const userFollows = follows.filter(f => f.buyerEmail === email).map(f => f.fishermanId);
  res.json(userFollows);
});

app.post('/api/follows', (req, res) => {
  const { buyerEmail, fishermanId } = req.body;
  
  // Cek agar tidak terjadi duplikat follow
  const exists = follows.find(f => f.buyerEmail === buyerEmail && f.fishermanId === fishermanId);
  if (!exists) {
    follows.push({ buyerEmail, fishermanId });
  }
  res.json({ message: "Berhasil mengikuti nelayan!" });
});

app.delete('/api/follows/:email/:id', (req, res) => {
  const email = req.params.email;
  const id = parseInt(req.params.id);
  
  // Hapus data follow dari array
  follows = follows.filter(f => !(f.buyerEmail === email && f.fishermanId === id));
  res.json({ message: "Berhasil batal mengikuti." });
});

// ==========================================
// ENDPOINT: PROFIL NELAYAN LAMA (UPDATE)
// ==========================================
app.get('/api/fisherman/profile', (req, res) => {
  res.json(fishermanProfile);
});

app.put('/api/fisherman/profile', (req, res) => {
  fishermanProfile = { ...fishermanProfile, ...req.body };
  res.json({ message: "Profil berhasil disimpan!", data: fishermanProfile });
});

// --- JALANKAN SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server MarineFresh menyala di http://localhost:${PORT}`);
});