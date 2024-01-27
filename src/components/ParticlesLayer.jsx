import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "../config/PartcleConfig.json";

function ParticlesLayer() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="App absolute top-0 left-0 h-[95%] w-[95%] z-[-100]">
      {init && <Particles options={particlesOptions} />}
    </div>
  );
}

export default ParticlesLayer;