import React from "react"
import Marquee from "react-fast-marquee";
import './MarqueeBanner.scss';

const MarqueeBanner = () => (
   <Marquee className="MarqueeBanner" gradient={false} speed={120}>
        <h2><span className="red">Boletos para segunda función disponibles en la entrada del teatro</span></h2>
   </Marquee>
);

export default MarqueeBanner