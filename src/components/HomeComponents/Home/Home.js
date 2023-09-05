import Header from "../Header/Header";
import Intro from "../Intro/Intro";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import ShowCase from "../ShowCase";
import { useEffect, useState } from "react";

const Home = () => {

  const [homeContent, setHomeContent] = useState({})
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/home/all`)
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setHomeContent(data.home)
      }
    })
  }, [])

  return (
    <div>
      <Header homeContent={homeContent} />
      <Intro homeContent={homeContent} />
      <ShowCase homeContent={homeContent} />
      <UpcomingEvents homeContent={homeContent} />
    </div>
  );
};

export default Home;
