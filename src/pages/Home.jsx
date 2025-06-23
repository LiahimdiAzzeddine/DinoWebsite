import { CanvasContainer } from "../components/CanvasContainer";
import { Overlay } from "../components/Overlay";

// pages/Home.jsx
export default function Home() {
  return   <><div className="h-screen w-full fixed top-0 z-10">
            <CanvasContainer />
          </div>;
           <Overlay />
          </>
}
