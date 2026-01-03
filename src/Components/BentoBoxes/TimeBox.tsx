import React, { useState, useEffect } from "react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import Globe from "./Globe";

interface TimeBoxProps {
  borderColorName?: ColorName;
}

const TimeBox: React.FC<TimeBoxProps> = ({ borderColorName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time to HH:MM:SS in NYC timezone
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/New_York",
    });
  };

  return (
    <BentoBox
      className="relative overflow-hidden h-full"
      borderColorName={borderColorName}
    >
      <h2 className="text-lg font-bold mb-0" style={{ color: colors.navy }}>
        My Time
      </h2>
      <div className="flex flex-col items-center gap-1">
        <div className="w-64 h-64">
          <Globe />
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-2xl font-mono font-medium"
            style={{ color: colors.slate }}
          >
            {formatTime(currentTime)}
          </p>
          <p className="text-sm" style={{ color: colors.periwinkle }}>
            📍 New York, NY
          </p>
        </div>
      </div>
    </BentoBox>
  );
};

export default TimeBox;
