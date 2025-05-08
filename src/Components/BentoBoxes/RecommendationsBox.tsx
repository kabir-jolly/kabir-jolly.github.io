import React from "react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import { Book, Flower, Music, Droplets, Sparkles } from "lucide-react";

interface RecommendationsBoxProps {
  borderColorName?: ColorName;
}

const RecommendationsBox: React.FC<RecommendationsBoxProps> = ({
  borderColorName,
}) => {
  return (
    <BentoBox
      className="md:col-span-1 relative p-4 h-[calc(100%-316px)]"
      borderColorName={borderColorName}
    >
      {/* Reading Recommendations */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Book size={18} style={{ color: colors.navy }} />
          <h2 className="text-lg font-bold" style={{ color: colors.navy }}>
            Reading Recs
          </h2>
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li className="text-sm leading-tight" style={{ color: colors.slate }}>
            <span>Factfulness</span>
            <div
              className="ml-5 mt-0.5 text-xs"
              style={{ color: colors.periwinkle }}
            >
              Hans Rosling
            </div>
          </li>
          <li className="text-sm leading-tight" style={{ color: colors.slate }}>
            <span>The Art of Learning</span>
            <div
              className="ml-5 mt-0.5 text-xs"
              style={{ color: colors.periwinkle }}
            >
              Joshua Waitzkin
            </div>
          </li>
          <li className="text-sm leading-tight" style={{ color: colors.slate }}>
            <span>Do Androids Dream of Electric Sheep?</span>
            <div
              className="ml-5 mt-0.5 text-xs"
              style={{ color: colors.periwinkle }}
            >
              Philip K. Dick
            </div>
          </li>
          <li className="text-sm leading-tight" style={{ color: colors.slate }}>
            <span>"Surely You're Joking, Mr. Feynman!"</span>
            <div
              className="ml-5 mt-0.5 text-xs"
              style={{ color: colors.periwinkle }}
            >
              Richard P. Feynman
            </div>
          </li>
        </ul>
      </div>

      {/* Random Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} style={{ color: colors.navy }} />
          <h2 className="text-lg font-bold" style={{ color: colors.navy }}>
            Random Recs
          </h2>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <Droplets size={16} style={{ color: colors.slate }} />
            <span className="text-sm" style={{ color: colors.slate }}>
              Owalas
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Flower size={16} style={{ color: colors.slate }} />
            <span className="text-sm" style={{ color: colors.slate }}>
              Desk Plants
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Music size={16} style={{ color: colors.slate }} />
            <span className="text-sm" style={{ color: colors.slate }}>
              AI-generated Spotify playlists
            </span>
          </li>
        </ul>
      </div>
    </BentoBox>
  );
};

export default RecommendationsBox;
