"use client";
import Globe from "react-globe.gl";
import { useRef, useEffect } from "react";
import GlobeImage from '@/public/download.jpeg'

const arcsData = Array.from({ length: 10 }, (_, i) => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: "#21E2E2",
}));

export default function SimpleGlobe({ ...props }) {
  const globeEl: any = useRef();
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;
    }
  }, []);

  return (
    <div {...props}>
      <Globe
        width={window.innerWidth / 2}
        ref={globeEl}
        atmosphereColor="#21E2E2"
        globeImageUrl={"/globe.jpg"}
        backgroundColor="rgba(0,0,0,0)"
        arcsData={arcsData}
        arcColor={"color"}
        arcStroke={1}
        arcDashGap={1}
        arcDashAnimateTime={4000}
      />
    </div>
  );
}
