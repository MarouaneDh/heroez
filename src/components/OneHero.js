import React, { useEffect, useState } from "react";
import { getOneHero } from "../controllers/controllers";
import { Link } from "react-router-dom";

const OneHero = ({ id }) => {
    const [hero, setHero] = useState('');

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const heroData = await getOneHero(id);
                setHero(heroData);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchHeroData();
    }, [id]);

    return (
        hero && <Link to={`/hero/${hero.id}`} className="coin-container">
            <div class="coin">
                <div class="side heads">
                    <img className="hero-image" src={hero.image?.url} alt={hero.name} />
                </div>
                <div class="side tails">
                    <img className="hero-image" src={hero.image?.url} alt={hero.name} />
                </div>
            </div>
        </Link>
    );
};

export default OneHero;
