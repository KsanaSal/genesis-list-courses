import axios from "axios";

async function getToken() {
    try {
        const response = await axios.get(
            "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions"
        );
        console.log(response);
        return response.data.token;
    } catch (error) {
        console.error(error);
    }
}

export default getToken;
