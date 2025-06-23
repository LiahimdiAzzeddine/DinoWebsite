import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Overlay } from "./components/Overlay";
import { AnimationProvider } from "./components/experience/AnimationContext";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NavBar from "./components/nav/NavBar";

// Import de tes pages
import Home from "./pages/Home";
import About from "./pages/About";
import Fqa from "./pages/Fqas";

function App() {
  return (
    <Router>
      <AnimationProvider>
        <div className="pages-gradient"></div>
        <main className="overflow-x-hidden">
          <div className="w-full relative m-auto flex justify-center">
        <NavBar/>
      </div>
          <Loader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gaqs" element={<Fqa />} />
          </Routes>

         
          <Footer />
        </main>
      </AnimationProvider>
    </Router>
  );
}

export default App;
