import { useParams } from "react-router-dom";
import MainPaperComp from "../../../../../components/shared/papers/main";

const MainPaperPage: React.FC<{ frontPage: boolean }> = ({ frontPage }) => {
    const {
        gradeName, category, paperID, studyBuddyReference
    } = useParams();

    return (
        <div className="container">
            <MainPaperComp
                category={category ?? ""}
                cover={frontPage}
                gradeName={gradeName ?? ""}
                paperID={paperID ?? ""}
                studyBuddyReference={studyBuddyReference ?? ""}
            />
        </div>
    );
}

export default MainPaperPage;