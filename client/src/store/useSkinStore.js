import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import capybara from "@/assets/profile/capybara.png";
import charlie from "@/assets/profile/charlie.png";
import tatang from "@/assets/profile/tatang.jpg";


const skins = [
  { id: 0, name: "Default", image: capybara },
  { id: 1, name: "Charlie", image: charlie },
  { id: 2, name: "Tatang", image: tatang },
  { id: 3, name: "Skin 4", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Skin 5", image: "https://via.placeholder.com/150", locked: true},
  { id: 5, name: "Skin 6", image: "https://via.placeholder.com/150", locked: false },
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
