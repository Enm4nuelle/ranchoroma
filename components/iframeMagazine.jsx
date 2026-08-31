export const IframeMagazine = (props) => {
    return (
        <section className={"iframeMagazine " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <h1 className="iframeMagazine-title sr-only">{props.data.title}</h1>
            <iframe
                className="iframeMagazine-iframe"
                src={props.data.srcIframe}
                title={props.data.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </section>
    )
}
export default IframeMagazine;