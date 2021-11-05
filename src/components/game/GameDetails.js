import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { useHistory } from "react-router"
import { getGame, getGameCategories } from "./GameManager.js"



export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState({})
    const [gameCategories, setGameCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGame(gameId)
            .then(res => setGame(res))
    }, {})

    useEffect(() => {
        getGameCategories()
            .then(res => setGameCategories(res))
    }, [])

    
    return (<>
        <h2>{game.title}</h2>
        <h4>Designer: {game.designer}</h4>
        <h4>Year Released: {game.year_released}</h4>
        <h4>Time to Play: {game.time_to_play}</h4>
        <h4>Number of Players: {game.num_players}</h4>
        <h4>Age Recommendation: {game.age_rec}</h4>
        <h4>Category: {gameCategories.map(gc => {
            if (gc?.game?.id === game?.id) {
                return gc?.cat?.category
            } else {
                return ""
            }
        })}</h4>
    </>
    
    
    )    
}