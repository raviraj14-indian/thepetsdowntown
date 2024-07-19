import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Owners from "./pages/Owners";
import LiveReservations from "./pages/LiveReservations";
import PastReservations from "./pages/PastReservations";
import CreateReservation from "./pages/CreateReservation";
import PetDetails from "./pages/PetDetails";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PastReservationDetail from "./pages/PastReservationDetail";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Billing from "./pages/Billing";
import DocumentPreview from "./pages/DocumentPreview";
import InvoicePage from "./pages/InvoicePage";
import NotFound from "./pages/NotFound";
import OldData from "./pages/OldData";

function App() {
  const { jwtToken, login } = useAuth();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      login(token);
    } else {
      login(null);
    }
  }, []);
  return (
    <>
      <div
        className="hero min-h-screen bg-repeat-y"
        style={{
          backgroundImage: "url(/bg-transformed.png)",
        }}
      >
        <div className="flex flex-col w-full h-screen">
          <BrowserRouter>
            {jwtToken && <Navbar />}
            <div className="flex flex-col flex-grow w-full">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/loading" element={<Loading />} />
                  <Route path="/all-owners" element={<Owners />} />
                  <Route
                    path="/past-reservations"
                    element={<PastReservations />}
                  />
                  <Route
                    path="/past-reservation/:id"
                    element={<PastReservationDetail />}
                  />
                  <Route path="/pet-details/:id" element={<PetDetails />} />
                  <Route path="/doc/:type/:id" element={<DocumentPreview />} />
                  <Route
                    path="/create-reservations"
                    element={<CreateReservation />}
                  />
                  <Route
                    path="/live-reservations"
                    element={<LiveReservations />}
                  />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/invoice" element={<InvoicePage />} />
                  <Route path="/invoice/:id" element={<InvoicePage />} />
                  <Route path="/old-data" element={<OldData />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
