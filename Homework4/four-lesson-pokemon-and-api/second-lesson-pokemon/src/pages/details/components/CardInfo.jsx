import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetchingPoke} from "../../../hooks/useFetchingPoke";
import Loader from "../../../Component/Loader/Loader";
import classes from "./CardInfo.module.css"
import CardPokeInfo from "./CardPokeInfo";
import BreedingInfo from "./BreedingInfo";
import MoviesInfo from "./MoviesInfo";
import Abilities from "./Abilities";


const CardInfo = () => {
    const params = useParams();
    const [poke, setPoke] = useState()
    const [isLoading, fetching] = useFetchingPoke(async () => {
        const response = await fetch(`https://localhost:44343/api/Pokemon/${params.name}`)
        const data = await response.json()
        if (data !== undefined)
            setPoke(data)
    })
    const stats = [poke?.statistic[0], poke?.statistic[1], poke?.statistic[2], poke?.statistic[5]]
    const abilities = [poke?.abilities[0], poke?.abilities[1]]

    console.log(stats)

    useEffect(() => {
        fetching()
    }, []);

    if (isLoading)
        return <Loader/>

    return (
        <>
            <div className={classes.header}>
                <Link to={"/"}>
                    <img src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-21-700x368.png" alt="asd"/>
                </Link>
            </div>
            <div class={classes.header__wrapper}>
                <CardPokeInfo poke={poke} stats={stats}/>
                <BreedingInfo poke={poke}/>
                <MoviesInfo poke={poke}/>
                <Abilities abilities={abilities}/>
            </div>
        </>
    )
}

export default CardInfo;