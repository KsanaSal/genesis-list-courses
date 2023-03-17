import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import css from "./CardCourse.module.css";

export const VideoJS = (props: any) => {
    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<Player | null>(null);
    const { options, onReady, isHovering = false } = props;

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    videojs.log("player is ready");
                    onReady && onReady(player);
                }
            ));

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef, onReady]);

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

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

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
