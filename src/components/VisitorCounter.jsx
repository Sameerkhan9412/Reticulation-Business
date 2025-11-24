import React, { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/reticulationbusiness.com/visits")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
      });
  }, []);

  // Animate counter from 0 → actual count
  useEffect(() => {
    let start = 0;
    if (count > 0) {
      const duration = 1500; // animation time (1.5 sec)
      const stepTime = Math.max(Math.floor(duration / count), 20);
      const timer = setInterval(() => {
        start += 1;
        setDisplayCount(start);
        if (start >= count) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <div className="bg-muted text-muted-foreground text-center py-2 text-xs sm:text-sm">
      👀 Total Visitors:{" "}
      <span className="font-bold text-primary">{displayCount}</span>
    </div>
  );
};

export default VisitorCounter;
