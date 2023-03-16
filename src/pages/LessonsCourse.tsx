import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import css from "./LessonsCourse.module.css";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoJS from "../components/videoPlayer/VideoPlayer";
import getLessonCourseId from "../data/getLessonCourseId";
import { Course } from "../interfaces/course.interface";

const LessonsCourse = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const { id } = useParams();
    console.log(id);
    const playerRef = React.useRef<Player | null>(null);

    const videoJsOptions = {
        muted: true,
        // poster: lesson.previewImageLink + "/cover.webp",
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                // src: lesson.meta.courseVideoPreview.link,
            },
        ],
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    };

    console.log("first", course);

    useEffect(() => {
        const getCourse = async () => {
            try {
                if (id) {
                    const fetchCourse = await getLessonCourseId(id);
                    console.log(fetchCourse);
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
        return `${hours}:${minutes}:${seconds}`;
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
                                        return <li key={i}>{skill}</li>;
                                    }
                                )}
                            </ul>
                            </div>
                    </div>
                </>
            )}
            {/* <VideoJS
                options={videoJsOptions}
                onReady={handlePlayerReady}
                isHovering={true}
            /> */}
        </div>
    );
};

export default LessonsCourse;
