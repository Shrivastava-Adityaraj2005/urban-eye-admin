import { useEffect, useState } from "react";
import logo1 from '../assets/eye-logo-1.png';
import logo2 from '../assets/eye-logo-2.png';
import logo3 from '../assets/eye-logo-3.png';
import logo4 from '../assets/eye-logo-4.png';

// Import all four frames
const frames = [logo1, logo2, logo3, logo4];

// Blink sequence: ping-pong
const sequence = [0, 1, 2, 3, 2, 1];

function BlinkingEye({ style }) {
  const [seqIndex, setSeqIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeqIndex((prev) => (prev + 1) % sequence.length);
    }, seqIndex === 0 ? 2000 : 80); // long pause on frame 1, faster for others

    return () => clearInterval(interval);
  }, [seqIndex]);

  return <img src={frames[sequence[seqIndex]]} style={style} className="h-10 w-18" />;
}


export default BlinkingEye;
