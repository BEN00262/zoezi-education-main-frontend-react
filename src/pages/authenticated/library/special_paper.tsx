import { Container } from "react-materialize";
import { useParams } from "react-router-dom";
import SpecialPaperLibraryComp from "../../../components/shared/papers/main/library";

const SLibraryPaperPage = () => {
    const { gradeName, category, paperID, savedStateID } = useParams();
    
    return (
        <Container>
            <div className="section">
                <SpecialPaperLibraryComp 
                    savedStateID={savedStateID ?? ""}
                    category={category ?? ""}
                    gradeName={gradeName ?? ""}
                    paperID={paperID ?? ""}
                />
            </div>
        </Container>
    );
}

export default SLibraryPaperPage;