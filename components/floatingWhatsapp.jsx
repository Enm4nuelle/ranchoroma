"use client";

import { usePathname } from "next/navigation";

export const FloatingWhatsapp = (props) => {
    const pathname = usePathname();
    if(props.data.allPagesMantain){
        return <></>;
    }else{
        if(props.data.pageMantain === pathname){
            return <></>;
        }
    }
    const url= `https://wa.me/${props.data.number}?text=${encodeURIComponent(props.data.defaultMessage)}`;
    return (
        <aside className={"floatingWhatsapp " + (props.data.showOnlyOnMobile ? "floatinWhatsapp-onlyMobile" : "")}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="floatingWhatsapp"
                aria-label="WhatsApp"
                title="Contáctanos por WhatsApp"
            >
                <i className="fa fa-brands fa-whatsapp" aria-hidden="true"></i>
            </a>
        </aside>
    )
}
export default FloatingWhatsapp;