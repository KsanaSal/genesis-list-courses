import Rating from "@mui/material/Rating";
import { Courses } from "../../interfaces/courses.interface";
import css from "./CardCourse.module.css";

const CardCourse = ({ course }: { course: Courses }) => {
    return (
        <a className={css.wrapCard} href="/genesis-list-courses">
            <img src={course.previewImageLink + "/cover.webp"} alt="Course" />
            <div className={css.wrapContent}>
                <div className={css.wrapTitle}>
                    <h2 className={css.title}>{course.title}</h2>
                    <p>{course.description}</p>
                </div>
                <div className={css.wrapText}>
                    <p className={css.text}>
                        Lessons:{" "}
                        <span className={css.span}>{course.lessonsCount}</span>
                    </p>
                    <p className={css.text}>
                        Rating:{" "}
                        <span className={css.span}>{course.rating}</span>
                        <Rating
                            className={css.rating}
                            name="half-rating-read"
                            defaultValue={course.rating}
                            precision={0.1}
                            readOnly
                        />
                    </p>
                </div>
                <div className={css.wrapTitle}>
                    <p className={css.text}>Skills:</p>
                    <ul>
                        {course.meta.skills &&
                            course.meta.skills.map((skill: any, i: number) => {
                                return <li key={i}>{skill}</li>;
                            })}
                    </ul>
                </div>
            </div>
        </a>
    );
};

export default CardCourse;
