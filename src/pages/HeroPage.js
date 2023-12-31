import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOneHero } from "../controllers/controllers";

import { GiAngelOutfit, GiBodyHeight, GiDevilMask, GiWeight } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import CountUp from "react-countup";
import { useSwipeable } from "react-swipeable";
import Loader from "../components/Loader";

const HeroPage = () => {
    const { id } = useParams()
    const [hero, setHero] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const displayStats = (stat) => {
        return (
            <span className="one-stat">
                <CountUp
                    end={stat}
                    duration={1}
                />
            </span>
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

    const handleSwipeLeft = () => {
        navigate('/hero/' + (+id + 1))
    }

    const handleSwipeRight = () => {
        navigate('/hero/' + (+id - 1))
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipeLeft(),
        onSwipedRight: () => handleSwipeRight()
    });

    const goBack = () => {
        navigate('/')
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }, [])


    return (
        hero && !loading ?
            <>
                <AiOutlineHome onClick={goBack} style={{ position: 'absolute', top: '32px', left: '32px' }} size={28} color="#666" />
                <div {...handlers} className="hero-page-container">
                    <div className="card">
                        <img className="img" alt={hero.name} src={hero.image.url} />
                        <div className="textBox">
                            <div className="hero-details">
                                <div>
                                    {
                                        hero.biography.alignment === 'good' ?
                                            <GiAngelOutfit className="good" /> :
                                            <GiDevilMask className="evil" />
                                    }
                                </div>
                                <div className="hero-name">
                                    <h1>{hero?.name}</h1>
                                    <h4>({hero.biography["full-name"]})</h4>
                                </div>
                                <div className="hero-body">
                                    <div>
                                        <GiBodyHeight />
                                        <span>{hero.appearance.height[1]} ({hero.appearance.height[0]})</span>
                                    </div>
                                    <div>
                                        <GiWeight />
                                        <span>{hero.appearance.weight[1]} ({hero.appearance.weight[0]})</span>
                                    </div>
                                </div>
                                <div className="hero-physique">
                                    <div>
                                        <span>{hero.appearance.race !== "null" ? " " + hero.appearance.race : ''} {hero.appearance.gender}, {hero.appearance["eye-color"]}-eyed{hero.appearance["hair-color"] === "No Hair" ? '' : ' and ' + hero.appearance["hair-color"] + '-haired'}. </span>
                                        <span>{hero.work.occupation === '-' ? '' : 'Works as ' + hero.work.occupation + ' '} {hero.work.base === '-' ? '' : 'based at ' + hero.work.base}</span>
                                    </div>
                                </div>
                                <div className="hero-stats">
                                    <span>Combat : {displayStats(hero.powerstats?.combat)}</span>
                                    <span>Durability : {displayStats(hero.powerstats?.durability)}</span>
                                    <span>Intelligence : {displayStats(hero.powerstats?.intelligence)}</span>
                                    <span>Power : {displayStats(hero.powerstats?.power)}</span>
                                    <span>Speed : {displayStats(hero.powerstats?.speed)}</span>
                                    <span>Strength : {displayStats(hero.powerstats?.strength)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <Loader />

    )
}

export default HeroPage