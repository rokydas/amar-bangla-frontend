import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./CommonStyles/style.scss";
import About from "./components/AboutComponents/About";
import Login from "./components/AuthComponents/Login/Login";
import PrivateRoute from "./components/AuthComponents/PrivateRoute/PrivateRoute";
import Register from "./components/AuthComponents/Register/Register";
import Loader from "./components/CommonComponents/Loader/Loader";
import Navbar from "./components/CommonComponents/Navbar/Navbar";
import AddDirector from "./components/DashboardComponents/AddDirector";
import AddEvent from "./components/DashboardComponents/AddEvent";
import Dashboard from "./components/DashboardComponents/Dashboard";
import ManageAdmin from "./components/DashboardComponents/ManageAdmin";
import ManageDirector from "./components/DashboardComponents/ManageDirector";
import ManageEvent from "./components/DashboardComponents/ManageEvent";
import UpdateDirector from "./components/DashboardComponents/UpdateDirector";
import Events from "./components/Events/Events";
import Home from "./components/HomeComponents/Home/Home";
import LearnBengali from "./components/LearnBengali/LearnBengali";
import EventDetails from "./components/EventDetails/EventDetails";
import UpdateEvent from "./components/DashboardComponents/UpdateEvent";
import Membership from "./Membership";
import ManageHomeContent from "./components/DashboardComponents/ManageHomeContent";
import Footer from "./components/CommonComponents/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import ManageAboutContent from "./components/DashboardComponents/ManageAboutContent";
import ManageMembershipContent from "./components/DashboardComponents/ManageMembership";
import ManageLearnBengaliContent from "./components/DashboardComponents/ManageLearnBengali";
import ByLaw from "./components/ByLaw/ByLaw";
import ManageByLaw from "./components/DashboardComponents/ManageByLaw";

export const AuthContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("auth-token");

  const apiUrl = process.env.REACT_APP_API_ROOT;
  

  useEffect(() => {
    setIsLoading(true);
    if (authToken !== "") {
      fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLoggedInUser(data.user);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedInUser({});
      setIsLoading(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          {!isLoading ? (
            <>
              {/* <AddressBar /> */}
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/learn-bengali" element={<LearnBengali />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/by-law" element={<ByLaw />} />

                {/* for only admin */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route
                      path="/dashboard/manage-admin"
                      element={<ManageAdmin />}
                    />
                    <Route path="/dashboard/add-event" element={<AddEvent />} />
                    <Route
                      path="/dashboard/manage-event"
                      element={<ManageEvent />}
                    />
                    <Route
                      path="/dashboard/manage-event/update/:id"
                      element={<UpdateEvent />}
                    />
                    <Route
                      path="/dashboard/add-director"
                      element={<AddDirector />}
                    />
                    <Route
                      path="/dashboard/manage-director"
                      element={<ManageDirector />}
                    />
                    <Route
                      path="/dashboard/manage-director/update/:id"
                      element={<UpdateDirector />}
                    />
                    <Route
                      path="/dashboard/manage-home"
                      element={<ManageHomeContent />}
                    />
                    <Route
                      path="/dashboard/manage-about"
                      element={<ManageAboutContent />}
                    />
                    <Route
                      path="/dashboard/manage-membership"
                      element={<ManageMembershipContent />}
                    />
                    <Route
                      path="/dashboard/manage-learn"
                      element={<ManageLearnBengaliContent />}
                    />
                    <Route
                      path="/dashboard/manage-by-law"
                      element={<ManageByLaw />}
                    />
                  </Route>
                </Route>
              </Routes>
              <Footer />
            </>
          ) : (
            <Loader />
          )}
        </BrowserRouter>
      </LocalizationProvider>
    </AuthContext.Provider>
  );
}

export default App;
