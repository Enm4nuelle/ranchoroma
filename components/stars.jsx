import React from "react";

export const Stars = (props) =>{
    const numStars = Math.round((props.numStars ?? 0) * 2) / 2;
    return(
        <React.Fragment>
            {Array.from({ length: (props.maxStars ?? 5) }, (star, i) => {
                let icon;
                if (i + 1 <= numStars) {
                    icon = props.fullIcon ?? "fa-solid fa-star";
                } else if (i + 0.5 <= numStars) {
                    icon = props.halfIcon ?? "fa-solid fa-star-half-stroke";
                } else {
                    icon = props.emptyIcon ?? "fa-regular fa-star";
                }
                return (
                    <i
                        key={i}
                        className={"stars " + icon}
                        aria-hidden="true"
                    ></i>
                );
            })}
        </React.Fragment>
    )
}
export default Stars;