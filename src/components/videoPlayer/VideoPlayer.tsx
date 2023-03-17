import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export const VideoJS = (props: any) => {
    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<Player | null>(null);
    const { options, onReady, isHovering = false } = props;

    React.useEffect(() => {
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
