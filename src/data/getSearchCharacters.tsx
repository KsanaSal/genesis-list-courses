import axios from "axios";

async function getSearchCharacters(query: string) {
    try {
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?name=${query}`
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getSearchCharacters;
