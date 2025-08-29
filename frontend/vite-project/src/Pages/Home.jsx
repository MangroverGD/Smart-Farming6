import { useEffect, useRef, useState } from 'react'
import '../CSS/Home.css'

import { NavLink } from 'react-router-dom';

import farmers from '../assets/farmers.json'

export const Home = () => {

    const text_ref = useRef(null);
    const button_ref = useRef(null);

    const stats_text = [
        "Place Holders",
        "Place Holders"
    ];

    const [farmerInd, setFarmerInd] = useState(0);
    const [statsInd, setStatsInd] = useState(0);
    const [mouseCords, setMouseCords] = useState({ x: 0, y: 0 });

    const animateStatsText = (text, anim) => {
        return new Promise((resolve) => {
            text.classList.add(anim);
            setTimeout(() => {
                text.classList.remove(anim);
                resolve();
            }, 1000);
        });
    }

    // farmer image cycle
    useEffect(() => {
        const inter = setInterval(() => {
            setFarmerInd(prev => (prev + 1) % farmers.length);
        }, 4000);
        return () => clearInterval(inter);
    }, []);

    // statistis text animation
    useEffect(() => {
        const anim = async () => {
            await animateStatsText(text_ref.current, "stats-fade");
            setStatsInd(prev => (prev+1) % stats_text.length);
            return;
        }
        
        const inter = setInterval(() => {
            anim();
            console.log(text_ref.current);
            console.log("get this");
        }, 4000);

        return () => clearInterval(inter);
    }, []);

    // mouse movement
    const handleMouseMove = event => {
        setMouseCords({
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        });
        const butn = button_ref.current;
        console.log(butn.style);
        // butn.style.scale = 2;
    }

    useEffect(() => {
        console.log(mouseCords);
    }, [mouseCords]);

    return <div className='home'>
        <div className='hero-container'>
            <div className='hero'>
                <div className='hero-demo'>
                    <p>
                    Smart Farming &#x2013; helping every farmer out there
                    </p>
                    <NavLink to='/predict?p=1' className='demo-button' onMouseMove={handleMouseMove} ref={button_ref}>
                        Crop Prediction &#8594;
                    </NavLink>
                </div>
            </div>
            <div className='hero'>
                {farmers.map((farmer, ind) => {
                    console.log(farmer);
                    if (ind === farmerInd)
                        return <img src={`${farmer}`} alt="" className={`farmer-img`} key={ind} style={{ zIndex: "1" }} />
                    return <img src={`${farmer}`} alt="" className={`farmer-img display-none`} key={ind} style={{ zIndex: "0" }} />
                })}
            </div>
        </div>

        <div className='statistics-container'>
                <div className='stats'>
                    <img src="/stats_graph.webp" alt="" className='stats-image' />
                </div>
                <div className='stats'>
                    <p className='stats-text' ref={text_ref}>
                        {stats_text[statsInd]}
                    </p>
                </div>
        </div>

        <div className='model-container'>
            <h1>
                About Our Model
            </h1>
            <div className='model-grid'>
                <p className='model-info'>
                Our model was trained on over 20 thousand images of farms, soil, and plants
                    <p style={{ color: "gray", fontSize: "1rem" }}>
                        See our <a href="" className='anchor-mod' style={{ color: "blue", opacity: "0.5" }}>documentation</a> for more details about our model
                    </p>
                </p>
                <p>
                    Placeholder text
                </p>
            </div>
            <h1 className='model-heading'>Connect With Us</h1>
            <div className='model-grid'>
                <div className='model-cell cell-1'>
                    <h1 className='link-label'>
                        Our open source model
                    </h1>
                    <NavLink to="https://github.com/ravikumar266/Smart-Forming" className="useful-link anchor-mod" target='_blank'>
                        <img src="/github.png" alt="" />
                        <h1>Github</h1>
                    </NavLink>
                </div>
                <div className='model-cell cell-2'>
                    <h1 className='link-label'>
                        Connect with us
                    </h1>
                    <NavLink className="useful-link anchor-mod">
                        <img src="/linkedin.png" alt="" />
                        <h1>LinkedIn</h1>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
}