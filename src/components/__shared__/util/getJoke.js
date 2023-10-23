import jokes from "../../../database/jokesData.json";

export function getJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex].joke || null;
}
