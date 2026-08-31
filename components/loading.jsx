import {
    BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader,
    DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader,
    PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SyncLoader
} from "react-spinners";

export const Loading = (props) => {
    const type = props.type ?? "bar";
    const color = props.color ?? "#000000";
    const size = props.size ?? 50;

    const loadingReturn = () => {
        switch (type) {
            case "bar":
                return (<BarLoader color={color} height={size}/>);
            case "beat":
                return (<BeatLoader color={color} size={size}/>);
            case "bounce":
                return (<BounceLoader color={color} size={size}/>);
            case "circle":
                return (<CircleLoader color={color} size={size}/>);
            case "climbingBox":
                return (<ClimbingBoxLoader color={color} size={size}/>);
            case "clip":
                return (<ClipLoader color={color} size={size}/>);
            case "clock":
                return (<ClockLoader color={color} size={size}/>);
            case "dot":
                return (<DotLoader color={color} size={size}/>);
            case "fade":
                return (<FadeLoader color={color} height={size} width={size / 5}/>);
            case "grid":
                return (<GridLoader color={color} size={size}/>);
            case "hash":
                return (<HashLoader color={color} size={size}/>);
            case "moon":
                return (<MoonLoader color={color} size={size}/>);
            case "pacman":
                return (<PacmanLoader color={color} size={size}/>);
            case "propagate":
                return (<PropagateLoader color={color} size={size}/>);
            case "puff":
                return (<PuffLoader color={color} size={size}/>);
            case "pulse":
                return (<PulseLoader color={color} size={size}/>);
            case "ring":
                return (<RingLoader color={color} size={size}/>);
            case "rise":
                return (<RiseLoader color={color} size={size}/>);
            case "rotate":
                return (<RotateLoader color={color} size={size}/>);
            case "scale":
                return (<ScaleLoader color={color} height={size} width={size / 5}/>);
            case "sync":
                return (<SyncLoader color={color} size={size}/>);

            default:
                return (<BarLoader color={color} height={size}/>);
        }
    }


    return (
        <div className={"loading"}>
            {loadingReturn()}
        </div>
    )
}
export default Loading;