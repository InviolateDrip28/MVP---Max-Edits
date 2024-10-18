"use client";
import Globe from "react-globe.gl";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// #F6BE00 => yellow
// #FF5C00 => orange
// #81dbdb => teal 

const arcsData = [
  {
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5072,
    endLng: 0.1276,
    color: "#F6BE00"
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 52.3555,
    endLng: 1.1743,
    color: "#81dbdb"
  },
  {
    startLat: 8.7832,
    startLng: 34.5085,
    endLat: 35.8617,
    endLng: 104.1954,
    color: "#F6BE00"
  },
  {
    startLat: 38.8375,
    startLng: 116.4074,
    endLat: -23.6345,
    endLng: 142.5528,
    color: "#FF5C00"
  },
  {
    startLat: -10.7128,
    startLng: -55.006,
    endLat: 56.1304,
    endLng: -106.3468,
    color: "#F6BE00"
  },
  {
    startLat: 36.7783,
    startLng: -119.4179,
    endLat: 35.9078,
    endLng: 127.7669,
    color: "#FF5C00"
  },
  {
    startLat: -5.69743,
    startLng: -53.44914,
    endLat: 49.12368,
    endLng: 102.28533,
    color: "#81dbdb"
  },
  {
    startLat: 12.8797,
    startLng: 121.7740,
    endLat: 23.6345,
    endLng: -102.5528,
    color: "#81dbdb"
  }
];

export default function GlobeModel({ ...props }) {
  const [countries, setCountries] = useState({ features: [] });

  const globeMaterial = new THREE.MeshPhongMaterial();
  globeMaterial.color = new THREE.Color("#8547FF");

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
    } else if (width < 1600) {
      return 800;
    } else {
      return 1200;
    }
  };

  const globeEl: any = useRef<any>(null);
  useEffect(() => {
    // load the country polygon shapes
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then(setCountries);

    if (globeEl.current) {
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;

      // increase the shadows
      const directionalLight = globeEl.current
        .lights()
        .find((obj3d: any) => obj3d.type === "DirectionalLight");
      if (directionalLight) {
        directionalLight.position.set(0, 1, 1);
        directionalLight.intensity = 3;
      }
    }
  }, []);

  return (
    <div {...props}>
      <Globe
        width={useSize()}
        height={useSize()}
        ref={globeEl}
        atmosphereColor="#C2A4FF"
        globeMaterial={globeMaterial}
        backgroundColor={"rgba(0,0,0,0)"}
        arcsData={arcsData}
        arcColor={"color"}
        arcsTransitionDuration={0}
        arcStroke={0.6}
        arcDashGap={1}
        arcDashAnimateTime={3000}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.5}
        hexPolygonUseDots={true}
        hexPolygonColor={() => "#F5F7FA"}
      />
    </div>
  );
}
