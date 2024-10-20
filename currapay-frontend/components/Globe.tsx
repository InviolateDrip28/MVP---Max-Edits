"use client";
import Globe from "react-globe.gl";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { arcsData } from "@/public/globeData/arcs";


export default function GlobeModel({ ...props }) {
  const [countries, setCountries] = useState({ features: [] });

  const globeMaterial = new THREE.MeshPhongMaterial();
  globeMaterial.color = new THREE.Color("#5C0AFF"); // accentDark

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
      return 900;
    } else {
      return 1200;
    }
  };

  const globeEl: any = useRef<any>(null);
  useEffect(() => {
    // load the country polygon shapes
    fetch("/globeData/countries.geojson")
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
        atmosphereColor="#81dbdb"
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
