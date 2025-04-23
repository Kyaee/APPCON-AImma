import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import capybara from "@/assets/profile/capybara.png";
import capscout from "@/assets/profile/capscout.svg";
import supcappie from "@/assets/profile/supcappie.svg";
import summercappy from "@/assets/profile/summercappy.svg";
import formalblue from "@/assets/profile/formalbluecappy.svg";
import formalblack from "@/assets/profile/formalblackcappy.svg";



const skins = [
  { id: 0, name: "Default", image: capybara },
  { id: 1, name: "Capscout", image: capscout },
  { id: 2, name: "Supercapy", image: supcappie, locked: true },
  { id: 3, name: "Summercapy", image: summercappy, locked: true },
  { id: 4, name: "Formalblue", image: formalblue, locked: true},
  { id: 5, name: "Formalblack", image: formalblack, locked: true },
];

// allSkins[selectedSkinIndex].image

const useSkinStore = create(
  persist(
    (set) => ({
      selectedSkinIndex: 0,
      selectedSkin: skins[0],
      allSkins: skins,
      

      setSelectedSkin: (skinIndex) => {
        if (skinIndex >= 0 && skinIndex < skins.length) {
          set({ 
            selectedSkinIndex: skinIndex,
            selectedSkin: skins[skinIndex]
          });
        }
      },
      
      getSkinByIndex: (index) => {
        if (index >= 0 && index < skins.length) {
          return skins[index];
        }
        return skins[0];
      }
    }),
    {
      name: 'skin-storage', // unique name for the localStorage key
      partialize: (state) => ({ 
        selectedSkinIndex: state.selectedSkinIndex,
        selectedSkin: state.selectedSkin 
      }), // only persist these fields
    }
  )
);

export default useSkinStore;
