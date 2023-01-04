import { Container } from "react-materialize";
import { useParams } from "react-router-dom";
import LibraryPaper from "../../../components/shared/papers/library";

const NLibraryPaperPage = () => {
    const { libraryRef } = useParams();

    return (
        <Container>
            <div className="section">
                <LibraryPaper
                    libraryRef={libraryRef ?? ""}
                />
            </div>
        </Container>
    );
}

export default NLibraryPaperPage;