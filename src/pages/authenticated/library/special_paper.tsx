import { useParams } from "react-router-dom";
import SpecialPaperLibraryComp from "../../../components/shared/papers/main/library";

const SLibraryPaperPage = () => {
    const { gradeName, category, paperID, savedStateID } = useParams();
    
    return (
        <SpecialPaperLibraryComp 
            savedStateID={savedStateID ?? ""}
            category={category ?? ""}
            gradeName={gradeName ?? ""}
            paperID={paperID ?? ""}
        />
    );
}

export default SLibraryPaperPage;