import notificationImage from '@/assets/job-opportunities/Notification.png';
import optionsImage from '@/assets/job-opportunities/options.png';

const ICON_CONFIG = {
  notification: {
    icon: notificationImage,
    alt: 'Notifications'
  },
  settings: {
    icon: optionsImage,
    alt: 'Settings'
  }
};

export default function IconButton({ type = 'notification', onClick }) {
  const config = ICON_CONFIG[type];

  return (
    <button 
      onClick={onClick} 
      className="flex items-center justify-center hover:opacity-80 transition-opacity"
    >
      <img
        src={config.icon}
        alt={config.alt}
        className="w-[25px] h-[25px] object-contain cursor-pointer"
      />
    </button>
  );
}