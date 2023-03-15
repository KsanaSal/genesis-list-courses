import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getLessonCourseId from "../data/getLessonCourseId";

const LessonsCourse = () => {
    const [lesson, setLesson] = useState([]);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const getLesson = async () => {
            try {
                if (id) {
                    const fetchLesson = await getLessonCourseId(id);
                    console.log(fetchLesson);
                    setLesson(fetchLesson);
                }
            } catch {
                console.log("first");
            }
        };
        getLesson();
    }, [id]);
    console.log(lesson);

    return <div>Character details{id}</div>;
};

export default LessonsCourse;
