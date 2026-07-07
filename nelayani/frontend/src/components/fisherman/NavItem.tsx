import { Page, NavItem as NavItemType } from "../../types";

interface NavItemProps {
  item: NavItemType;
  active: boolean;
  collapsed: boolean;
  setPage: (p: Page) => void;
  setMobileOpen: (v: boolean) => void;
}

export function NavItem({ item, active, collapsed, setPage, setMobileOpen }: NavItemProps) {
  return (
    <div className="relative group/item">
      <button
        onClick={() => { setPage(item.page); setMobileOpen(false); }}
        className={`w-full flex items-center rounded-xl transition-all duration-150 outline-none relative ${
          collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"
        } ${
          active
            ? "bg-[#00B4D8]/18 text-white"
            : "text-white/45 hover:text-white/90 hover:bg-white/6"
        }`}
      >
        {/* Left accent bar */}
        <span
          className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full transition-all duration-200 ${
            active ? "bg-[#00B4D8] opacity-100" : "opacity-0"
          }`}
        />

        {/* Icon */}
        <span className={`flex-shrink-0 transition-colors duration-150 ${active ? "text-[#00B4D8]" : ""}`}>
          {item.icon}
        </span>

        {/* Label */}
        {!collapsed && (
          <span className={`flex-1 text-sm font-medium truncate ${active ? "text-white font-semibold" : ""}`}>
            {item.label}
          </span>
        )}

        {/* Badge */}
        {"badge" in item && item.badge && !collapsed && (
          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            {item.badge}
          </span>
        )}
        {"badge" in item && item.badge && collapsed && (
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
            {item.badge}
          </span>
        )}
      </button>

      {/* Tooltip (collapsed only) */}
      {collapsed && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-[#1A3355] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-xl
            opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity duration-150 z-[100] whitespace-nowrap shadow-xl"
        >
          {item.label}
          {"badge" in item && item.badge ? (
            <span className="ml-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
          ) : null}
          {/* Arrow */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1A3355]" />
        </div>
      )}
    </div>
  );
}
