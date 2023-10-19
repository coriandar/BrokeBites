import jokes from "../../../database/jokesData.json";

export function getJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    console.log(jokes[randomIndex]);
    return jokes[randomIndex].joke || null;
}
