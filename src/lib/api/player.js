import { backendURL } from "../core/core";

export const getAllPlayers = async () => {
    const res = await fetch(`${backendURL}/players`)
    const data = await res.json();
    return data

}


export const getSinglePlayer = async (id) => {
    const res = await fetch(`${backendURL}/players/${id}`)
    const data = await res.json()
    return data
}
