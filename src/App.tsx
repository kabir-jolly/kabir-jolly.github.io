import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./Components/Portfolio";
import BlogPost from "./Components/BlogPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/:type/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
