import Header from "../Header/Header";
import Footer from "../../CommonComponents/Footer/Footer";
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
      <Footer />
    </div>
  );
};

export default Home;
