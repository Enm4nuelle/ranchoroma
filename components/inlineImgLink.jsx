import Link from "next/link";

export const InlineImgLink = (props) => {
    return (
        <section className={"inlineImgLink " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <Link
                href={props.data.href}
                className="inlineImgLink-frame"
                style={{ backgroundImage: `url(${props.data.img})` }}
            >
                {/* Imagen real oculta visualmente: SEO/alt + accesibilidad.
                    El efecto visual lo da el background-image de arriba */}
                <img
                    src={props.data.img}
                    alt={props.data.altImg}
                    className="inlineImgLink-imgSr"
                    loading="lazy"
                />
                <div className="inlineImgLink-overlay" aria-hidden="true"></div>
                <span className="inlineImgLink-text">
                    {props.data.textLink}
                </span>
            </Link>
        </section>
    )
}
export default InlineImgLink;