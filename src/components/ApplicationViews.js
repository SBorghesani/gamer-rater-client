import React from "react"
import { Route } from "react-router-dom"
import { GameList } from './game/GameList.js'
import { GameDetails } from './game/GameDetails.js'
import { GameForm } from './game/GameForm.js'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route path="/games/:gameId">
                <GameDetails />
            </Route>
            <Route path="/game/new">
                <GameForm />
            </Route>
        </main>
    </>
}