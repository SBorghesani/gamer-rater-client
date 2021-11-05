import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameCategories, getCategories } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    // const [newCat, setNewCat] = useState({
    //     cat_id: 0
    // })

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: 0,
        num_players: 0,
        time_to_play: 0,
        age_rec: 0
    })

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])
    
    const handleControlledInputChange = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }

    // const handleCats = (event) => {
    //     const category = Object.assign({}, newCat)
    //     newCat[event.target.name] = event.target.value
    //     setNewCat(category)
    // }

    const constructNewGame = () => {
        const copyGame = {...currentGame}
        console.log(copyGame)
        createGame(copyGame)
    }

    // const constructNewCats = () => {
    //     const copyCat = {...newCat}
    //     createCats(copyCat)
    // }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="gameDescription">Game Description: </label>
                <input type="text" name="description" className="form-control"
                    placeholder="Description"
                    value={currentGame.description}
                    defaultValue="Describe the Game"
                    onChange={handleControlledInputChange}>
                </input>
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="number" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_players">Number of Players: </label>
                    <input type="number" name="num_players" required autoFocus className="form-control"
                        value={currentGame.num_players}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="timeToPlay">Time to play: </label>
                    <input type="number" name="time_to_play" required autoFocus className="form-control"
                        value={currentGame.time_to_play}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRec">Recommended age: </label>
                    <input type="number" name="age_rec" required autoFocus className="form-control"
                        value={currentGame.age_rec}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select type="text" name="categories" className="form-control"
                    placeholder="Category"
                    defaultValue="Choose a Category"
                    onChange={handleControlledInputChange}>
                    <option>Choose a Category</option>
                    {
                        categories.map(c => <option name="categories" value={c.id}>{c.category}</option>)
                    }
                </select>
            </div>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        yearReleased: parseInt(currentGame.year_released),
                        numberOfPlayers: parseInt(currentGame.num_players),
                        timeToPlay: parseInt(currentGame.time_to_play),
                        ageRec: parseInt(currentGame.age_rec),
                        categories: currentGame.categories
                    }
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}