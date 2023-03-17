import axios from "axios";
import getToken from "./getToken";
const BASE_URL = "https://api.wisey.app/api/v1/core/preview-courses";

async function getLessonCourseId(id: string) {
    try {
        const token = await getToken();
        const response = await axios.get(BASE_URL + "/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getLessonCourseId;
