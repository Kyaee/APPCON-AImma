import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Briefcase,
  Gem,
  Heart,
  MapPin,
  Rocket,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";

export default function Opportunities() {
  // Navigation items data
  const navItems = [
    { icon: <MapPin size={25} />, label: "Roadmap", active: false },
    { icon: <User size={25} />, label: "Profile", active: false },
    { icon: <ShoppingCart size={25} />, label: "Shop", active: false },
  ];

  // Pricing plan data

  return (
    <div className="relative w-full h-screen bg-[#f6faff] overflow-hidden">
      {/* Background grid pattern - simplified from the original complex grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      {/* Navigation bar */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-6">
        <div className="bg-white rounded-[20px] border border-solid border-black p-3 flex items-center justify-between">
          <div className="flex items-center gap-10 px-10">
            {navItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                {item.icon}
                <span
                  className={`text-base ${
                    item.active ? "font-extrabold" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-2.5 bg-[#ffff6d] rounded-[20px] border border-solid border-black px-4 py-1">
              <ShoppingCart size={25} />
              <span className="font-extrabold text-black text-base">
                Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User stats */}
      <div className="absolute top-10 right-10 flex items-center gap-4">
        <div className="flex items-center">
          <Heart className="w-[26px] h-[26px]" />
          <span className="ml-2 font-black text-lg">10</span>
        </div>
        <div className="flex items-center">
          <Gem className="w-[26px] h-[26px]" />
          <span className="ml-2 font-black text-lg">500</span>
        </div>
        <Bell className="w-[26px] h-[26px]" />
        <Settings className="w-[26px] h-[26px]" />
      </div>

      {/* Page titles */}
      
    </div>
  );
}
