import React from "react";
import { transformImage } from "../../lib/features";
// import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <div className="flex -space-x-2">
      {avatar.slice(0, max).map((i, index) => (
        <img
          key={index}
          src={transformImage(i)}
          alt={`Avatar ${index}`}
          className="w-12 h-12 rounded-full border-2 border-white"
          // style={{ zIndex: max - index }}
        />
      ))}
      {avatar.length > max && (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
          +{avatar.length - max}
        </div>
      )}
    </div>
  );
};

export default AvatarCard;
