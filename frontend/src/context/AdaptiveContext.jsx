import React, { createContext, useContext, useEffect, useState } from "react";

const AdaptiveContext = createContext({
  device: "desktop",
  width: 0,
});

export const AdaptiveProvider = ({ children }) => {
  const [device, setDevice] = useState("desktop");
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      if (w <= 600) setDevice("mobile");
      else if (w <= 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AdaptiveContext.Provider value={{ device, width }}>
      {children}
    </AdaptiveContext.Provider>
  );
};

export const useAdaptive = () => useContext(AdaptiveContext);