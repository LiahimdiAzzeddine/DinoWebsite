import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import NavBar from "./components/nav/NavBar";
import { AnimationProvider } from "./components/experience/AnimationContext";
import AnimatedGradientBackground from "./components/experience/SceneColor";
import { useState } from "react";
import Loader from "./components/Loader";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimationProvider>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}

      <div className="relative w-screen h-screen overflow-hidden">
        {/* Navbar FIXED en haut */}
        <div className="w-full relative m-auto flex justify-center">
          <NavBar />
        </div>
        <Canvas>
          <AnimatedGradientBackground />

          <Experience />
        </Canvas>
      </div>
    </AnimationProvider>
  );
}

export default App;
