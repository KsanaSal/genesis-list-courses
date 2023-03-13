import css from "./Courses.module.css";
import CardCourse from "../components/cardCourse/CardCourse";
import { useEffect, useState } from "react";
import getCardsCourses from "../data/getCardsCourses";

const Characters = ({ loading }: any) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const fetchCourses = await getCardsCourses();
                console.log(fetchCourses);
                setCourses(fetchCourses.courses);
            } catch {
                console.log("first");
            }
        };
        getCourses();
    }, []);
    console.log(courses);
    console.log(loading);

    return (
        <div>
            <h1 className={css.title}>Learn more</h1>
            <ul>
                {courses &&
                    courses.map((course: any) => {
                        return (
                            <li key={course.id}>
                                <CardCourse course={course} />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Characters;
