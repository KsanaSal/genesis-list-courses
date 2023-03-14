import { Courses } from "../../interfaces/courses.interface";
import CardCourse from "../cardCourse/CardCourse";
import css from "./CardListCourse.module.css";



const CardListCourse = ({ courses }: { courses: Courses[] }) => {
    return (
        <ul className={css.wrapList}>
            {courses &&
                courses.map((course: Courses) => {
                    return (
                        <li key={course.id}>
                            <CardCourse course={course} />
                        </li>
                    );
                })}
        </ul>
    );
};

export default CardListCourse;
