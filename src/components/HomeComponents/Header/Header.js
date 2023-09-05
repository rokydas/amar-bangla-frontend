import React from "react";

const Header = ({ homeContent }) => {
  const bgImageStyle = {
    backgroundImage: "url(" + homeContent.banner + ")" ,
    height: "500px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
        <section style={bgImageStyle}>
            
        </section>
    );
};

export default Header;
