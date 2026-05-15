import { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Portfolio from "./Components/Portfolio";
import BlogPost from "./Components/BlogPost";
import Posts from "./Components/Posts";
import NavBar from "./Components/NavBar";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/:type/:slug" element={<BlogPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
