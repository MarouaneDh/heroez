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
        <Link to={`/hero/${hero.id}`} className="hero-card">
            {hero && <img className="hero-image" src={hero.image?.url} alt={hero.name} />}
            {hero && <p>{hero.name}</p>}
        </Link>
    );
};

export default OneHero;
