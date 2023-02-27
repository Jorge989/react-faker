import styles from "./styles.scss";
import { useEffect, useRef } from "react";

const Home = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      headingRef.current.classList.toggle("text-white");
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1 ref={headingRef}>Home</h1>
    </div>
  );
};

export default Home;
