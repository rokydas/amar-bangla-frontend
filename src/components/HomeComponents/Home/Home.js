import Header from "../Header/Header";
import Intro from "../Intro/Intro";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import ShowCase from "../ShowCase";

const Home = () => {
  return (
    <div>
      <Header />
      <Intro />
      <ShowCase />
      <UpcomingEvents />
    </div>
  );
};

export default Home;
