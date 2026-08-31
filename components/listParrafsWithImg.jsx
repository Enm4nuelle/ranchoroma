export const ListParrafsWithImg = (props) => {
    return (
        <section className={"listParrafsWithImg " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            {
                props.data.info.map((item, index)=>(
                    <div
                        className={
                            "listParrafsWithImg-item-container listParrafsWithImg-item-container" + 
                            (item.startAtRight ? "1": (index % 2).toString())
                        }
                        key={item.title + index}
                    >
                        <article className={
                            "listParrafsWithImg-item " +
                            ((item.startAtRight || index % 2 !== 0) ? "listParrafsWithImg-item-reversed" : "")
                        }>
                            <div className="listParrafsWithImg-item-text">
                                <p className="listParrafsWithImg-item-text-subTitle">
                                    {item.subTitle}
                                </p>
                                {
                                    (props.data.isMainH1 && index === 0) ?
                                    <h1 className="listParrafsWithImg-item-text-title">
                                        {item.title}
                                    </h1>
                                    :
                                    <h2 className="listParrafsWithImg-item-text-title">
                                        {item.title}
                                    </h2>
                                }
                                <div className="listParrafsWithImg-item-text-divider"></div>
                                <div className="listParrafsWithImg-item-text-article">
                                    {item.article}
                                </div>
                            </div>
                               
                            <div className="listParrafsWithImg-item-images">
                                <img
                                    className="listParrafsWithImg-item-images-img"
                                    src={item.img}
                                    alt={item.title}
                                    loading={props.data.isAfterHeader && index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        </article>
                    </div>
                ))
            }
        </section>
    )
}
export default ListParrafsWithImg;