import { Bell, Settings } from 'lucide-react';

const ICON_CONFIG = {
  notification: {
    icon: Bell,
    alt: 'Notifications'
  },
  settings: {
    icon: Settings,
    alt: 'Settings'
  }
};

export default function IconButton({ type = 'notification', onClick }) {
  const config = ICON_CONFIG[type];
  const Icon = config.icon;

  return (
    <button 
      onClick={onClick} 
      className="flex items-center justify-center hover:opacity-80 transition-opacity"
    >
      <Icon
        className="w-[25px] h-[25px] cursor-pointer"
        aria-label={config.alt}
      />
    </button>
  );
}