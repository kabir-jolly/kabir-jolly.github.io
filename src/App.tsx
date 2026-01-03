import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./Components/Portfolio";
import BlogPost from "./Components/BlogPost";
import Posts from "./Components/Posts";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
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
