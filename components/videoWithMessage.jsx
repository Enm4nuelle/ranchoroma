export const VideoWithMessage = (props) => {
    return (
        <section className={"videoWithMessage " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")} aria-label={props.data.title ?? "Video de fondo"}>
            <video
                autoPlay
                muted
                loop
                playsInline
                preload={props.data.isAfterHeader ? "metadata" : "none"}
                poster={props.data.posterImg}
                className="videoWithMessage-video"
                aria-hidden="true"
            >
                <source src={props.data.srcVideo} type={props.data.videoType ?? "video/mp4"}></source>
                <p>Tu navegador no soporta videos HTML5.</p>
            </video>
            <div className="videoWithMessage-overlay" aria-hidden="true"></div>
            <img
                src={props.data.srcImg}
                className="videoWithMessage-logo"
                alt={"Logo de " + props.data.title}
                loading = {props.data.isAfterHeader ? "eager" : "lazy"}
            />
        </section>
    )
}
export default VideoWithMessage;