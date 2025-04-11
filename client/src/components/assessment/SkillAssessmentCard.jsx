import { useState } from "react";

export default function SkillAssessmentCard({ skill, onRatingChange }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(skill.id, newRating);
  };

  return (
    <div className="bg-white/10 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-white">{skill.name}</h3>
        <span className="text-amber-400">{rating}/5</span>
      </div>

      <p className="text-white/70 text-sm mb-3">{skill.description}</p>

      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(star)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              rating >= star
                ? "bg-amber-500 text-white"
                : "bg-white/20 text-white/50"
            }`}
          >
            {star}
          </button>
        ))}
      </div>
    </div>
  );
}
