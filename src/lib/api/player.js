import { backendURL } from "../core/core";

export const getAllPlayers = async () => {
    const res = await fetch(`${backendURL}/players`,{
        cache: "no-store"
    })

    if(!res.ok){
        return [];
    }
    const data = await res.json();
    return data

}


export const getSinglePlayer = async (id) => {
    const res = await fetch(`${backendURL}/players/${id}`, {
        cache: "no-store"
    })
    if(!res.ok){
        return null;
    }
    const data = await res.json()
    return data
}
