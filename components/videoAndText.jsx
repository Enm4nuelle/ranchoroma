export const VideoAndText = (props) => {
    return (
        <section className={"videoAndText " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className={"videoAndText-container " + (props.data.hasBackground ? "videoAndText-background" : "")}>
                <div className="videoAndText-text">
                    <h2 className="videoAndText-text-title">
                        {props.data.title}
                    </h2>
                    <div className="videoAndText-text-divider" aria-hidden="true"></div>
                    <p className="videoAndText-text-description">
                        {props.data.description}
                    </p>
                </div>
                <div className="videoAndText-video">
                    <iframe
                        className="videoAndText-video-iframe"
                        src={props.data.videoUrl}
                        title={props.data.titleIframe ?? "Video Explicativo"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            </div>
        </section>
    )
}
export default VideoAndText;