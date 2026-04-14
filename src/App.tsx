import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/provider";
import Home from "./components/Home";
import Users from "./components/Users";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
