"use client";

import { useState } from "react";

export const Dropdown = (props) =>{
    const [showItems, setShowItems] = useState(false);
    return(
        <section className="dropdown">
            <div
                className="dropdown-head"
                onClick={() => setShowItems(!showItems)}
            >
                <h2 className="dropdown-head-title">{props.title}</h2>
                {
                    showItems ?
                    <div className="dropdown-head-icon">
                        <i className={(props.iconUp ?? "fa fa-solid fa-chevron-up")} aria-hidden="true"></i>
                    </div>
                    :
                    <div className="dropdown-head-icon">
                        <i className={(props.iconDown ?? "fa fa-solid fa-chevron-down")} aria-hidden="true"></i>
                    </div>
                }
            </div>
            <ul className={
                "dropdown-items " + (props.oneItem ? "dropdown-items-oneItem " : "") +
                (showItems ? "dropdown-items-show" : "dropdown-items-hide" + (props.oneItem ? " dropdown-items-hide-noDelay" : ""))
            }>
                {
                    props.data.map((item, index)=>{
                        const delay = props.oneItem ? 0 : (showItems ? (index * 0.1) : ((props.data.length - 1 - index) * 0.05));
                        return(
                            <li
                                className={
                                    "dropdown-items-text " + (props.oneItem ? "" : (index % 2 === 0 ? "dropdown-items-text-gray " : "")) +
                                    (showItems ? (props.oneItem ? "dropdown-item-enter-simple" : "dropdown-item-enter")
                                        : (props.oneItem ? "dropdown-item-exit-simple" : "dropdown-item-exit"))
                                }
                                key={index}
                                style={{
                                    animationDelay: delay + "s",
                                    paddingLeft: props.oneItem ? "0px" : ""
                                }}
                            >
                                {(props.oneItem ? "" : "- ") + item}
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}
export default Dropdown;