import { useEffect, useState } from "react";
import { useScroll } from "@react-three/drei";

const ScrollHandler = ({ totalPages, onPageChange }) => {
  const scroll = useScroll();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const page = Math.floor(scroll.offset * totalPages);
      if (page !== currentPage) {
        console.log("🚀 ~ handleScroll ~ page:", page)
        setCurrentPage(page);
        if (onPageChange) onPageChange(page);
      }
    
    };

    scroll.el.addEventListener("scroll", handleScroll);
    return () => {
      scroll.el.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, totalPages, currentPage, onPageChange]);

  return null; 
};

export default ScrollHandler;
