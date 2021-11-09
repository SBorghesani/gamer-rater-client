import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createReview } from './GameManager.js'


export const ReviewForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const [newReview, setNewReview] = useState({
        game_id: gameId,
        player_id: parseInt(localStorage.getItem('gr_token')),
        review: ""
    })

    const handleControlledInputChange = (event) => {
        const review = Object.assign({}, newReview)
        review[event.target.name] = event.target.value
        setNewReview(review)
    }



    return (
        <form className="reviewForm">
            <h2>Add Review</h2>
            <fieldset>
                <div className="form-group">
                    <label>Review: </label>
                    <textarea type="text" name="review" required
                        value={newReview.review}
                        onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        game_id: gameId,
                        player_id: parseInt(localStorage.getItem('gr_token')),
                        review: newReview.review
                    }
                    createReview(review)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Submit</button>
        </form>
    )


}