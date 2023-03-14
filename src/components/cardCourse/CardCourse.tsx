import character from "../../assets/character.png";
import css from "./CardCourse.module.css";

const CardCourse = ({ course }: any) => {
    return (
        <div className={css.wrapCard}>
            <img src={course.previewImageLink + "/cover.webp"} alt="Course" />
            <div className={css.wrapContent}>
                <div className={css.wrapTitle}>
                    <h2 className={css.title}>{course.title}</h2>
                    <p>{course.description}</p>
                </div>
                <div className={css.wrapText}>
                    <p className={css.text}>
                        Lessons count:{" "}
                        <span className={css.span}>{course.lessonsCount}</span>
                    </p>
                    <p className={css.text}>
                        Rating:{" "}
                        <span className={css.span}>{course.rating}</span>
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
        </div>
    );
};

export default CardCourse;
