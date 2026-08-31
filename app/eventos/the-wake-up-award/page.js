import JsonData from "../../../data/data.json";
import GalleryAndList from "@/components/galleryAndList";
import ListParrafsWithImg from "@/components/listParrafsWithImg";
import VideoWithMessage from "@/components/videoWithMessage";

export const WakeUpAward = () => {
    const pages = [];
    for (const page of JsonData.pagesWakeUpAward) {
        if(page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "VideoWithMessage"){
            pages.push({e: <VideoWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "GalleryAndList"){
            pages.push({e: <GalleryAndList data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default WakeUpAward;