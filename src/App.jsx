import "./App.css";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimationProvider } from "./components/experience/AnimationContext";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NavBar from "./components/nav/NavBar";

// Import de tes pages
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import ScrollToTop from "./components/ScrollToTop";
import BlogSingle from "./pages/BlogDetail";
import GradientBackground from "./components/experience/GradientBackground";

function App() {

  return (
    <Router>
      <ScrollToTop />
      
      <AnimationProvider>
              <GradientBackground />

        <main className="overflow-x-hidden">
          <div className="w-full relative m-auto flex justify-center">
        <NavBar/>
      </div>
          {/* <Loader/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogSingle />} />
            <Route path="/career" element={<Career />} />
          </Routes>
          <Footer />
        </main>
      </AnimationProvider>
    </Router>
  );
}

export default App;
