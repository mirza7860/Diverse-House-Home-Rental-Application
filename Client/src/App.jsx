import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Loginpage from "./pages/Loginpage/Loginpage.jsx";
import Registerpage from "./pages/Registerpage/Register.jsx";
import CreateListing from "./pages/CreateListingPage/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails/ListingDetails.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
