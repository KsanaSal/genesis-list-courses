import CardCourse from "../cardCourse/CardCourse";
import css from "./CardListCourse.module.css";

const CardListCourse = ({ courses }: any) => {
    return (
        <ul className={css.wrapList}>
            {courses &&
                courses.map((course: any) => {
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
