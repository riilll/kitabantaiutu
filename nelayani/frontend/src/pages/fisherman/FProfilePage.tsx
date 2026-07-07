import { useState, useEffect } from "react";
import { Star, Camera } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
// 1. Import fungsi API Anda
import { apiGet, apiPut } from "../../services/api";

export function FProfilePage() {
  const { navigate } = useNavigationContext();

  // 1. Ambil data lengkap dari localStorage di awal
  const savedName = localStorage.getItem("activeUserName") || "";
  const savedEmail = localStorage.getItem("activeUserEmail") || "";
  const savedPhone = localStorage.getItem("activeUserPhone") || "";
  const savedPort = localStorage.getItem("activeUserPort") || "";
  const savedArea = localStorage.getItem("activeUserArea") || "";
  const savedBoat = localStorage.getItem("activeUserBoat") || "";

  // 2. Gunakan useEffect untuk mengisi state setelah halaman dimuat
  const [profileData, setProfileData] = useState<Record<string, string>>({
    "Nama Lengkap": savedName,
    "Email": savedEmail,
    "Nomor HP": savedPhone,
    "Pelabuhan Asal": savedPort,
    "Area Penangkapan": savedArea,
    "Nama Kapal": savedBoat
  });

  useEffect(() => {
    setProfileData(prev => ({
      ...prev,
      "Nama Lengkap": localStorage.getItem("activeUserName") || "",
      "Email": localStorage.getItem("activeUserEmail") || "",
      "Nomor HP": localStorage.getItem("activeUserPhone") || "",
      "Pelabuhan Asal": localStorage.getItem("activeUserPort") || "",
      "Area Penangkapan": localStorage.getItem("activeUserArea") || "",
      "Nama Kapal": localStorage.getItem("activeUserBoat") || ""
    }));
  }, []);
  
  const handleInputChange = (label: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [label]: value
    }));
  };

  // 4. Kirim data ke Backend saat tombol Simpan ditekan
  const handleSave = async () => {
    try {
      // Format ulang data agar sesuai dengan struktur database backend
      const payload = {
        name: profileData["Nama Lengkap"],
        email: profileData["Email"],
        phone: profileData["Nomor HP"],
        location: profileData["Pelabuhan Asal"],
        boat: profileData["Nama Kapal"]
      };

      const response: any = await apiPut("/fisherman/profile", payload);
      
      // Update data di header/aplikasi jika diperlukan
      localStorage.setItem("activeUserName", payload.name);
      localStorage.setItem("activeUserEmail", payload.email);
      localStorage.setItem("activeUserPhone", payload.phone);
      localStorage.setItem("activeUserPort", payload.location);
      localStorage.setItem("activeUserBoat", payload.boat);
      
      alert(response.message || "Perubahan profil berhasil disimpan ke server!");
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Profil Nelayan</h1>
      
      <div className="bg-card rounded-3xl border border-border p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1541064828014-503911d13103?w=100&h=100&fit=crop" alt="" className="w-24 h-24 rounded-3xl object-cover" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center border-2 border-white">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold">{profileData["Nama Lengkap"] || "Memuat..."}</h2>
            <p className="text-muted-foreground">Nelayan Terverifikasi · Banda Aceh</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-sm">4.9</span>
              <span className="text-muted-foreground text-sm">(1.240 ulasan)</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { label: "Nama Lengkap" },
            { label: "Email" },
            { label: "Nomor HP" },
            { label: "Pelabuhan Asal" },
            { label: "Area Penangkapan" },
            { label: "Nama Kapal" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-semibold mb-2">{f.label}</label>
              <input 
                value={profileData[f.label] || ""} 
                onChange={(e) => handleInputChange(f.label, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleSave}
          className="mt-6 w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}