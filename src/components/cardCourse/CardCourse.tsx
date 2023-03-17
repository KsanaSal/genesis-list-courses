import React from "react";
import Rating from "@mui/material/Rating";
import videojs from "video.js";
import Icon from "@mui/material/Icon";
import { Courses } from "../../interfaces/courses.interface";
import VideoJS from "../videoPlayer/VideoPlayer";
import css from "./CardCourse.module.css";
import Player from "video.js/dist/types/player";

const CardCourse = ({ course }: { course: Courses }) => {
    const playerRef = React.useRef<Player | null>(null);

    const videoJsOptions = {
        muted: true,
        poster: course.previewImageLink + "/cover.webp",
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: course.meta.courseVideoPreview.link,
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

    return (
        <a className={css.wrapCard} href={"/genesis-list-courses/" + course.id}>
            <VideoJS
                options={videoJsOptions}
                onReady={handlePlayerReady}
                isHovering={true}
            />
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
                                return (
                                    <li key={i} className={css.listSkills}>
                                        <Icon sx={{ color: "#1a887b" }}>
                                            hotel_class
                                        </Icon>
                                        <span>{skill}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </a>
    );
};

export default CardCourse;
