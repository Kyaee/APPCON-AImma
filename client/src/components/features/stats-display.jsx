import heartImage from '@/assets/job-opportunities/heart.png';
import gemImage from '@/assets/job-opportunities/gem.png';

const STATS_CONFIG = {
  heart: {
    icon: heartImage,
    alt: 'Lives'
  },
  gem: {
    icon: gemImage,
    alt: 'Gems'
  }
};

export default function StatsDisplay({ type = 'heart', value }) {
  const config = STATS_CONFIG[type];

  return (
    <div className="flex items-center gap-2">
      <img
        src={config.icon}
        alt={config.alt}
        className="w-[25px] h-[25px] object-contain"
      />
      <span className="text-black font-inter text-lg font-black leading-7">
        {value}
      </span>
    </div>
  );
}