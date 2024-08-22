"use client";
import Globe from "react-globe.gl";
import { useRef, useEffect, useState } from "react";

const arcsData = [
  {
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5072,
    endLng: 0.1276,
    color: "#81dbdb",
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 52.3555,
    endLng: 1.1743,
    color: "#81dbdb",
  },
  {
    startLat: 8.7832,
    startLng: 34.5085,
    endLat: 35.8617,
    endLng: 104.1954,
    color: "#81dbdb",
  },
  {
    startLat: 38.8375,
    startLng: 116.4074,
    endLat: -23.6345,
    endLng: 142.5528,
    color: "#81dbdb",
  },
  {
    startLat: -10.7128,
    startLng: -55.006,
    endLat: 56.1304,
    endLng: -106.3468,
    color: "#81dbdb",
  },
  {
    startLat: 36.7783,
    startLng: -119.4179,
    endLat: 35.9078,
    endLng: 127.7669,
    color: "#81dbdb",
  },
  // {
  //   startLat: -10.7128,
  //   startLng: -55.0060,
  //   endLat: 56.1304,
  //   endLng: -106.3468,
  //   color: "red",
  // },
];

export default function GlobeModel({ ...props }) {
  const useSize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const windowSizeHandler = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", windowSizeHandler);

      return () => {
        window.removeEventListener("resize", windowSizeHandler);
      };
    }, []);

    if (width < 775) {
      return 400;
    } else if (width < 1024) {
      return 600;
    } else {
      return 800;
    }
  };

  const globeEl: any = useRef<any>(null);
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
        width={useSize()}
        height={useSize()}
        ref={globeEl}
        atmosphereColor="#21E2E2"
        globeImageUrl={"/globe.jpg"}
        backgroundColor="rgba(0,0,0,0)"
        arcsData={arcsData}
        arcColor={"color"}
        arcStroke={1}
        arcDashGap={1}
        arcDashAnimateTime={5000}
      />
    </div>
  );
}
