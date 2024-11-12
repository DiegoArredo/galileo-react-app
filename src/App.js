import Main from "./Main/Main";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
// import Checkout from "./checkout/Checkout";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
