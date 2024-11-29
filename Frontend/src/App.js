import './App.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // npm install bootstrap-dark-5
import 'bootstrap/dist/js/bootstrap.bundle.min.js';        // npm install bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import Payment from './screens/Payment'; 
// import MyOrder from './screens/MyOrder';

const App=()=> {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/payment" element={<Payment />}/>
          {/* <Route path="/myorder" element={<MyOrder />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
