import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimationProvider } from "./components/experience/AnimationContext";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NavBar from "./components/nav/NavBar";
import { ScrollRestoration } from 'react-router-dom';

// Import de tes pages
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimationProvider>
        <div className="pages-gradient"></div>
        <main className="overflow-x-hidden">
          <div className="w-full relative m-auto flex justify-center">
        <NavBar/>
      </div>
          <Loader/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/career" element={<Career />} />
            
          </Routes>
          <Footer />
        </main>
      </AnimationProvider>
    </Router>
  );
}

export default App;
