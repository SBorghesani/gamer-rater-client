import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { uploadImage } from './GameManager.js'

export const ImageForm = () => {

    const history = useHistory()
    const {gameId} = useParams()
    const [newImage, setNewImage] = useState('')

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setNewImage(base64ImageString)
        });
    }
    

    return (<>
        <form>
            <h2>Upload Image</h2>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={gameId} />
            <button onClick={(event) => {
                event.preventDefault()
                const image = {
                    game_id: parseInt(gameId),
                    player_id: parseInt(localStorage.getItem('gr_token')),
                    url: newImage
                }
                uploadImage(image)
                    .then(() => {history.push(`/games/${gameId}`)})
            }}>Upload</button>
        </form>
    </>
    )
}





