
export const getAllFixturesData = async() => {
    const res = await fetch(`http://localhost:5000/fixtures`);
    const data = await res.json();
    return data;
}