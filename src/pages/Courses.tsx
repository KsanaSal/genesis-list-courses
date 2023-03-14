import css from "./Courses.module.css";
import { useEffect, useState } from "react";
import getCardsCourses from "../data/getCardsCourses";
import CardListCourse from "../components/cardListCourse/CardListCourse";
import { Courses } from "../interfaces/courses.interface";

const Characters = ({ loading }: any) => {
    const [courses, setCourses] = useState<Courses[]>([]);

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
            <CardListCourse courses={courses} />
        </div>
    );
};

export default Characters;
