import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/AuthComponents/Login/Login";
import Register from "./components/AuthComponents/Register/Register";
import Home from "./components/HomeComponents/Home/Home";
import PrivateRoute from "./components/AuthComponents/PrivateRoute/PrivateRoute";
import "./CommonStyles/style.scss";
import Loader from "./components/CommonComponents/Loader/Loader";
import Navbar from "./components/CommonComponents/Navbar/Navbar";
import About from "./components/AboutComponents/About";
import Events from "./components/Events/Events";
import Dashboard from "./components/DashboardComponents/Dashboard";
import ManageAdmin from "./components/DashboardComponents/ManageAdmin";
import AddEvent from "./components/DashboardComponents/AddEvent";
import ManageEvent from "./components/DashboardComponents/ManageEvent";
import AddDirector from "./components/DashboardComponents/AddDirector";
import ManageDirector from "./components/DashboardComponents/ManageDirector";
import LearnBengali from "./components/LearnBengali/LearnBengali";
import UpdateDirector from "./components/DashboardComponents/UpdateDirector";

export const AuthContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    setIsLoading(false);
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
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <BrowserRouter>
        {!isLoading ? (
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Home />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/learn-bengali" element={<LearnBengali />} />

              {/* for only admin */}
              <Route element={<PrivateRoute isAdmin={true} />}></Route>

              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/manage-admin" element={<ManageAdmin />} />
                <Route path="/dashboard/add-event" element={<AddEvent />} />
                <Route path="/dashboard/manage-event" element={<ManageEvent />} />
                <Route path="/dashboard/add-director" element={<AddDirector />} />
                <Route path="/dashboard/manage-director" element={<ManageDirector />} />
                <Route path="/dashboard/manage-director/update/:id" element={<UpdateDirector />} />
              </Route>
            </Routes>
          </>
        ) : (
          <Loader />
        )}
      </BrowserRouter>
      {/* </LocalizationProvider> */}
    </AuthContext.Provider>
  );
}

export default App;
