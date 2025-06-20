import "./App.css";
import {  useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { Overlay } from "./components/Overlay";
import { AnimationProvider } from "./components/experience/AnimationContext";
import Footer from "./components/Footer";
import Loader from "./components/Loader";


function App() {
  return (
     <AnimationProvider>
          <div className="pages-gradient"></div>
    <main className="overflow-x-hidden">
      <Loader/>

			<div className="h-screen w-full fixed top-0 z-10 ">
				<CanvasContainer />
			</div>
    <Overlay />  
      <Footer />
  </main>

  </AnimationProvider>
  );
}
export default App;
