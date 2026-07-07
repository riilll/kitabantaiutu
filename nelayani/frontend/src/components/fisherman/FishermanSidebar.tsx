import { Anchor, Fish, ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Page } from "../../types";
import { NavItem } from "./NavItem";
import { F_NAV, F_NAV2 } from "../../constants";

export interface SidebarProps {
  page: Page;
  setPage: (p: Page) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export function FishermanSidebar({ page, setPage, collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  // Mengambil nama nelayan yang aktif dari localStorage secara dinamis
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";
  
  // Cek apakah ini akun baru atau akun demo (Ahmad Rasyid)
  const isNewAccount = userName !== "Ahmad Rasyid";

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          flex-shrink-0 flex flex-col h-screen overflow-hidden relative z-50
          border-r border-white/[0.06]
          shadow-[4px_0_24px_rgba(0,0,0,0.35)]
          fixed top-0 left-0 lg:relative
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          width: collapsed ? 68 : 252,
          transition: "width 240ms cubic-bezier(0.4,0,0.2,1), transform 240ms cubic-bezier(0.4,0,0.2,1)",
          background: "linear-gradient(180deg, #0F2747 0%, #0A1E3B 100%)",
        } as React.CSSProperties}
      >
        {/* --- HEADER --- */}
        <div
          className="flex items-center border-b border-white/[0.06] flex-shrink-0"
          style={{ height: 64, padding: collapsed ? "0 10px" : "0 16px" }}
        >
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2.5 flex-1 min-w-0 overflow-hidden"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00B4D8]/25">
              <Anchor className="text-white" style={{ width: 15, height: 15 }} />
            </div>
            {!collapsed && (
              <span
                className="text-[15px] font-extrabold text-white truncate"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: collapsed ? 0 : 1, transition: "opacity 200ms" }}
              >
                Nela<span className="text-[#00B4D8]">yani</span>
              </span>
            )}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all duration-150 ml-1"
            title={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
          >
            {collapsed
              ? <ChevronRight style={{ width: 14, height: 14 }} />
              : <ChevronLeft style={{ width: 14, height: 14 }} />
            }
          </button>
        </div>

        {/* --- MODE BADGE --- */}
        <div
          className="flex-shrink-0 border-b border-white/[0.06]"
          style={{ padding: collapsed ? "10px 10px" : "10px 14px" }}
        >
          {collapsed ? (
            <div className="relative group/badge flex justify-center">
              <div className="w-9 h-9 bg-[#00B4D8]/12 rounded-xl flex items-center justify-center border border-[#00B4D8]/20 relative">
                <Fish className="text-[#00B4D8]" style={{ width: 16, height: 16 }} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0F2747] shadow-sm" />
              </div>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-[#1A3355] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover/badge:opacity-100 pointer-events-none transition-opacity z-[100] whitespace-nowrap shadow-xl">
                Mode Nelayan • Online
                <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1A3355]" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 bg-[#00B4D8]/10 border border-[#00B4D8]/20 rounded-xl px-3 py-2.5 shadow-sm">
              <div className="relative flex-shrink-0">
                <Fish className="text-[#00B4D8]" style={{ width: 15, height: 15 }} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#0F2747]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#00B4D8] leading-tight">Mode Nelayan</p>
                <p className="text-[10px] text-emerald-400 leading-tight">• Online</p>
              </div>
            </div>
          )}
        </div>

        {/* --- NAV --- */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: collapsed ? "12px 8px" : "12px 10px", scrollbarWidth: "none" }}
        >
          <div className="space-y-0.5">
            {F_NAV.map(item => {
              // Menyalin data item agar tidak merusak data asli
              const modifiedItem = { ...item };
              
              // Menghapus badge notifikasi jika ini adalah akun baru
              if (isNewAccount && modifiedItem.badge) {
                modifiedItem.badge = undefined;
              }

              return (
                <NavItem
                  key={modifiedItem.page}
                  item={modifiedItem}
                  active={page === modifiedItem.page}
                  collapsed={collapsed}
                  setPage={setPage}
                  setMobileOpen={setMobileOpen}
                />
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-white/[0.06]" />

          <div className="space-y-0.5">
            {F_NAV2.map(item => (
              <NavItem
                key={item.page}
                item={item}
                active={page === item.page}
                collapsed={collapsed}
                setPage={setPage}
                setMobileOpen={setMobileOpen}
              />
            ))}
          </div>
        </nav>

        {/* --- PROFILE --- */}
        <div
          className="flex-shrink-0 border-t border-white/[0.06]"
          style={{ padding: collapsed ? "12px 8px" : "12px 10px" }}
        >
          {collapsed ? (
            <div className="relative group/prof flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541064828014-503911d13103?w=80&h=80&fit=crop&auto=format"
                  alt={userName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/15 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0F2747]" />
              </div>
              <button
                onClick={() => {
                  setPage("f-fisherman-login");
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                title="Keluar"
              >
                <LogOut style={{ width: 13, height: 13 }} />
              </button>

              {/* Tooltip */}
              <div className="absolute left-full top-3 -translate-y-0 ml-3 bg-[#1A3355] border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-xl opacity-0 group-hover/prof:opacity-100 pointer-events-none transition-opacity z-[100] whitespace-nowrap shadow-xl">
                <p className="font-bold">{userName}</p>
                <p className="text-white/50 text-[10px]">Banda Aceh • Online</p>
                <span className="absolute right-full top-3 border-4 border-transparent border-r-[#1A3355]" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors group/profrow">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1541064828014-503911d13103?w=80&h=80&fit=crop&auto=format"
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/15 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0F2747] shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">{userName}</p>
                <p className="text-[11px] text-white/45 truncate leading-tight">Banda Aceh</p>
                <p className="text-[10px] text-emerald-400 leading-tight font-medium">• Online</p>
              </div>
              <button
                onClick={() => {
                  setPage("f-fisherman-login");
                }}
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover/profrow:opacity-100 transition-all duration-150"
                title="Keluar"
              >
                <LogOut style={{ width: 13, height: 13 }} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}