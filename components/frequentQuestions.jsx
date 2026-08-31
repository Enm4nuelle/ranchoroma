import Dropdown from "./dropdown";
import ScrollAnimation from "./scrollAnimation";

export const FrequentQuestions = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationQuestion ?? 0;
    let delayAnimationItems = [];
    if(props.data.questions){
        for(let i = 0; i < props.data.questions.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section className={"frequentQuestions " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="frequentQuestions-header">
                    <h2 className="frequentQuestions-header-title">{props.data.title}</h2>
                    <div className="frequentQuestions-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <div className="frequentQuestions-questions">
                {
                    props.data.questions.map((quest, index)=>(
                        <ScrollAnimation animation={quest.typeAnimation} pixelsDisplacement={quest.pixelsAnimation} duration={props.data.durationAnimationQuestions} delay={delayAnimationItems[index]} key={index}>
                            <Dropdown
                                title={quest.question}
                                data = {[quest.answer]}
                                oneItem = {true}
                            />
                        </ScrollAnimation>
                    ))
                }
            </div>
        </section>
    )
}
export default FrequentQuestions;