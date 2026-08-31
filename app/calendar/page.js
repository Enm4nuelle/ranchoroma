import JsonData from "../../data/data.json";
import GoogleCalendar from "@/components/googleCalendar";

export const Calendar = () => {
    const pages = [];
    for (const page of JsonData.pagesCalendar) {
        if (page.pageName === "GoogleCalendar"){
            pages.push({e: <GoogleCalendar data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Calendar;