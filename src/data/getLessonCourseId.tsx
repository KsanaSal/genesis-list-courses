import axios from "axios";
const BASE_URL = "https://api.wisey.app/api/v1/core/preview-courses";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YjBiMzdiZC03Y2QyLTQ5YWUtOGFjOS0xOGRkODU4OTg2MDQiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MjU1NzAsImV4cCI6MTY3OTYyNTU3MH0.59UIhzJCAuQZl86gXR8wr1wGhJDHSLuTUaGXp1CSdnU";

async function getLessonCourseId(id: string) {
    try {
        const response = await axios.get(BASE_URL + "/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getLessonCourseId;
