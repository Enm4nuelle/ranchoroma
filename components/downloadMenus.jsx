import ScrollAnimation from "./scrollAnimation";

export const DownloadMenus = (props) => {
    return (
        <section className={"downloadMenus " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="downloadMenus-container">
                <div className="downloadMenus-textPart">
                    <div className="downloadMenus-textPart-text">
                        <h2 className="downloadMenus-textPart-text-title">{props.data.title}</h2>
                        <div className="downloadMenus-textPart-text-divider" aria-hidden="true"></div>
                        <p className="downloadMenus-textPart-text-description">{props.data.description}</p>
                    </div>
                    <ul className="downloadMenus-textPart-text-buttons">
                        {
                            props.data.buttons.map((button, index) => (
                                <li className="downloadMenus-textPart-text-buttons-buttonDownload-container" key={button.text + index}>
                                    <a
                                        className={
                                            (button.type === "primary" ? "buttonPrimary " : "buttonSecondary ") +
                                            "downloadMenus-textPart-text-buttons-buttonDownload"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={button.href}
                                    >
                                        {button.text}<i className={"downloadMenus-textPart-text-buttons-buttonDownload-icon " + button.icon}></i>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="downloadMenus-img-container">
                    <img
                        className="downloadMenus-img"
                        alt={props.data.altImg ?? "Menu Establecimiento"}
                        src={props.data.img}
                    />
                </div>
            </div>
        </section>
    )
}
export default DownloadMenus;