import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOneHero } from "../controllers/controllers";
import AnimatedNumber from 'react-animated-number';

import { GiAngelOutfit, GiBodyHeight, GiDevilMask, GiWeight } from 'react-icons/gi';

const HeroPage = () => {
    const { id } = useParams()
    const [hero, setHero] = useState('');

    const displayStats = (stat) => {
        return (
            <AnimatedNumber component="text" value={stat}
                style={{
                    transition: '1s ease-out',
                    fontSize: 20,
                }}
                stepPrecision={0.1}
                duration={1000}
                formatValue={n => n}
            />
        )
    }

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

    console.log(hero)

    return (
        hero && <div className="hero-page-container">
            <img className="hero-page-image" alt={hero.name} src={hero.image.url} />
            <div className="hero-details">
                <div>
                    {
                        hero.biography.alignment === 'good' ?
                            <GiAngelOutfit className="good" /> :
                            <GiDevilMask className="evil" />
                    }
                    <h1>{hero?.name}</h1>
                </div>
                <div className="hero-physique">
                    <span>{hero.appearance.gender}{hero.appearance.race !== "null" ? " " + hero.appearance.race : ''}, {hero.appearance["hair-color"]}-haired and {hero.appearance["eye-color"]}-eyed </span>

                    <div>
                        <GiBodyHeight />
                        <span>{hero.appearance.height[1]} ({hero.appearance.height[0]})</span>
                    </div>
                    <div>
                        <GiWeight />
                        <span>{hero.appearance.weight[1]} ({hero.appearance.weight[0]})</span>
                    </div>
                </div>
                <div>
                    <span>Combat : {displayStats(hero.powerstats?.combat)}</span>
                    <span>Durability : {displayStats(hero.powerstats?.durability)}</span>
                    <span>Intelligence : {displayStats(hero.powerstats?.intelligence)}</span>
                    <span>Power : {displayStats(hero.powerstats?.power)}</span>
                    <span>Speed : {displayStats(hero.powerstats?.speed)}</span>
                    <span>Strength : {displayStats(hero.powerstats?.strength)}</span>
                </div>
            </div>
        </div>
    )
}

export default HeroPage