import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Forgetp from './Components/Forgetp/Forgetp';
import Labour from './Components/Labour/Labour';
import AddJob from './Components/Labour/AddJob';
import Delete from './Components/Labour/Delete';
import Update from './Components/Labour/Update';
import Customer from './Components/Customer/Customer';
import Labourers from './Components/Labourers/Labourers';
import Request from './Components/Customer/Request';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import StarRating from './Components/StarRating/StarRating';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetp" element={<Forgetp />} />
          <Route path="/labour" element={<Labour />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update" element={<Update />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/request" element={<Request />} />
          <Route path="/labourers/:jobTitle" element={<Labourers />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/StarRating" element={<StarRating />} />
          
          {/* <Route path="/requestService" element={<RequestService />} />  */}
          <Route path="/" element={<Home />} />
        </Routes>\
        
      </Router>
    </div>
  );
}

export default App;
