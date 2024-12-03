import Main from "./Main/Main";
import Checkout from "./checkout/Checkout";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Identify from "./identify/Identify";
import Cart from "./shopingcart/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/join/*" element={<Identify />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/carrito" element={<Cart/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
