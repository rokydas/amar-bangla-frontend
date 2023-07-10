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

export const AuthContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    setIsLoading(true);
    if (authToken !== "") {
      fetch("http://localhost:5001/auth/me", {
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
  }, []);

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          {!isLoading ? (
            <>
              {/* <AddressBar /> */}
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/learn-bengali" element={<LearnBengali />} />

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
                  </Route>
                </Route>
              </Routes>
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
