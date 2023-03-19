import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export const VideoJS = (props: any) => {
    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<Player | null>(null);
    const { options, onReady, isHovering = false, lessonId = "" } = props;

    React.useEffect(() => {
        const startTime = localStorage.getItem(`startTime_${lessonId}`);
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    onReady && onReady(player);
                }
            ));
            const startTime = localStorage.getItem(`startTime_${lessonId}`);
            player.currentTime(startTime || 0);
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
            player.currentTime(startTime || 0);
        }
    }, [options, videoRef, onReady, lessonId]);

    const handleMouseEnter = () => {
        if (playerRef.current && isHovering) {
            playerRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (playerRef.current && isHovering) {
            playerRef.current.pause();
        }
    };

    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                const startTime = localStorage.getItem(`startTime_${lessonId}`);
                player.currentTime(startTime || 0);
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef, lessonId]);

    return (
        <div
            data-vjs-player
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ flex: "1" }}
        >
            <div ref={videoRef} />
        </div>
    );
};

export default VideoJS;
