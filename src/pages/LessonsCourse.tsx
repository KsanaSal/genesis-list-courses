import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Icon from "@mui/material/Icon";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import css from "./LessonsCourse.module.css";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoJS from "../components/videoPlayer/VideoPlayer";
import getLessonCourseId from "../data/getLessonCourseId";
import { Course, Lesson } from "../interfaces/course.interface";

const LessonsCourse = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [video, setVideo] = useState("");
    const [titleLesson, setTitleLesson] = useState("");
    const [currentLesson, setCurrentLesson] = useState(0);
    const { id } = useParams();
    const playerRef = React.useRef<Player | null>(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: video,
            },
        ],
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    };

    useEffect(() => {
        const getCourse = async () => {
            try {
                if (id) {
                    const fetchCourse = await getLessonCourseId(id);
                    fetchCourse.lessons.sort(
                        (l1: Lesson, l2: Lesson) => l1.order - l2.order
                    );
                    const lessonCourse = window.localStorage.getItem(id);
                    if (!lessonCourse) {
                        setVideo(fetchCourse.lessons[0].link);
                        setTitleLesson(fetchCourse.lessons[0].title);
                        window.localStorage.setItem(
                            id,
                            JSON.stringify({
                                lessonOrder: fetchCourse.lessons[0].order,
                            })
                        );
                    } else {
                        const currentOrder = JSON.parse(lessonCourse);
                        setVideo(
                            fetchCourse.lessons[currentOrder.lessonOrder - 1]
                                .link
                        );
                        setTitleLesson(
                            fetchCourse.lessons[currentOrder.lessonOrder - 1]
                                .title
                        );
                        setCurrentLesson(currentOrder.lessonOrder);
                    }
                    setCourse(fetchCourse);
                }
            } catch {
                console.log("first");
            }
        };
        getCourse();
    }, [id]);

    const timeTransform = (value: number): string => {
        const hours: number = Math.floor(value / 3600);
        const minutes: number = Math.floor((value - hours * 3600) / 60);
        const seconds: number = value - hours * 3600 - minutes * 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const changeVideo = (lesson: Lesson) => {
        setVideo(lesson.link);
        setTitleLesson(lesson.title);
        if (id) {
            window.localStorage.setItem(
                id,
                JSON.stringify({
                    lessonOrder: lesson.order,
                })
            );
        }
        setCurrentLesson(lesson.order);
    };

    return (
        <div>
            {course && (
                <>
                    <h1 className={css.title}>{course.title}</h1>
                    <div className={css.wrapData}>
                        <p className={css.text}>
                            Date launch:{" "}
                            <span className={css.span}>
                                {moment(course.launchDate).format("DD.MM.YYYY")}
                            </span>
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
                    <div className={css.wrapContent}>
                        <img
                            className={css.image}
                            src={course.previewImageLink + "/cover.webp"}
                            alt=""
                        />
                        <div className={css.wrapText}>
                            <div className={css.wrapCount}>
                                <p className={css.text}>
                                    Lessons video:{" "}
                                    <span className={css.span}>
                                        {course.lessons.length}
                                    </span>
                                </p>
                                <p className={css.text}>
                                    Duration:{" "}
                                    <span className={css.span}>
                                        {timeTransform(course.duration)}
                                    </span>
                                </p>
                            </div>
                            <p>{course.description}</p>
                            <p className={css.text}>Skills:</p>
                            <ul>
                                {course.meta.skills &&
                                    course.meta.skills.map(
                                        (skill: any, i: number) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className={css.listSkills}
                                                >
                                                    <Icon
                                                        sx={{
                                                            color: "#1a887b",
                                                        }}
                                                    >
                                                        hotel_class
                                                    </Icon>
                                                    <span>{skill}</span>
                                                </li>
                                            );
                                        }
                                    )}
                            </ul>
                        </div>
                    </div>

                    <div className={css.wrapLessons}>
                        <h2 className={css.titleLesson}>{titleLesson}</h2>
                        <div className={css.videoLessons}>
                            <VideoJS
                                options={videoJsOptions}
                                onReady={handlePlayerReady}
                                isHovering={false}
                            />
                            <ul className={css.listLesson}>
                                {course.lessons.map((lesson) => {
                                    return (
                                        <li
                                            key={lesson.id}
                                            onClick={() => changeVideo(lesson)}
                                            className={`${css.lessons} ${
                                                lesson.order === currentLesson
                                                    ? css.lessonActive
                                                    : ""
                                            } ${
                                                lesson.status === "locked"
                                                    ? css.lessonLocked
                                                    : ""
                                            }`}
                                        >
                                            <div className={css.dataLesson}>
                                                <p>
                                                    Lesson{" "}
                                                    <span>{lesson.order}</span>
                                                </p>
                                                <span>
                                                    {timeTransform(
                                                        lesson.duration
                                                    )}
                                                </span>
                                                <Icon
                                                    sx={{
                                                        color: "#f57f04",
                                                    }}
                                                >
                                                    {lesson.status ===
                                                    "unlocked"
                                                        ? "lock_open"
                                                        : "lock"}
                                                </Icon>
                                            </div>
                                            <h3 className={css.titleListLesson}>
                                                {lesson.title}
                                            </h3>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonsCourse;
