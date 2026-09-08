"use client";

import ScrollAnimation from "./scrollAnimation";
import RoomsJson from "../data/rooms.json";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

export const ImgWithLightBox = (props) => {
    const pathname = usePathname();
    
    const [listImgs, setListImgs] = useState([]);
    const [title, setTitle] = useState("");
    const [imgSelected, setImgSelected] = useState({});

    useMemo(()=>{
        if(props.data.infoFromJsons){
            let slug = pathname.split("/")[2];
            if(!slug){
                return;
            }
            for(let i = 0; i < RoomsJson.rooms.length; i++){
                if(slug === RoomsJson.rooms[i].slug){
                    setListImgs(RoomsJson.rooms[i].imgs);
                    setTitle(RoomsJson.rooms[i].title);
                    let auxRoomDefaultSelected = RoomsJson.rooms[i].imgs[0];
                    auxRoomDefaultSelected.index = 0;
                    setImgSelected(RoomsJson.rooms[i].imgs[0]);
                    break;
                }
            }
        }else{
            setListImgs(props.data.imgs);
            setTitle(props.data.title);
            let auxRoomDefaultSelected = props.data.imgs[0];
            auxRoomDefaultSelected.index = 0;
            setImgSelected(props.data.imgs[0]);
        }
    }, [pathname]);

    const onChangeImgFocus = (src, alt, index) => {
        setImgSelected({
            "src": src,
            "alt": alt,
            "index": index
        });
    }

    return (
        <section className={"imgWithLightBox " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="imgWithLightBox-header">
                    <p className="imgWithLightBox-header-subtitle">{props.data.subTitle}</p>
                    {
                        props.data.isMainH1 ?
                        <h1 className="imgWithLightBox-header-title">{title}</h1>
                        :
                        <h2 className="imgWithLightBox-header-title">{title}</h2>
                    }
                    <div className="imgWithLightBox-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <div className="imgWithLightBox-container-imgs">
                <div className="imgWithLightBox-imgs-principalImg">
                    <img
                        className="imgWithLightBox-imgs-principalImg-img"
                        src={imgSelected.src}
                        alt={imgSelected.alt}
                    />
                </div>
                <div className="imgWithLightBox-imgs-listImg">
                    {
                        listImgs.map((item, index)=>(
                            <button
                                className={"imgWithLightBox-imgs-listImg-item-button " +
                                    (imgSelected.index === index ? "imgWithLightBox-imgs-listImg-item-button-selected" : "imgWithLightBox-imgs-listImg-item-button-noSelected")
                                }
                                key={item.alt + index}
                                onClick={()=>{onChangeImgFocus(item.src, item.alt, index)}}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="imgWithLightBox-imgs-listImg-item"
                                />
                            </button>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
export default ImgWithLightBox;