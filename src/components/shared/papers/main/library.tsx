import HeadlessComp from "./components/HeadlessComp";
import PaperWrapperComp from "./wrapper";

interface ISpecialPaperLibrary {
    gradeName: string
    category: string
    paperID: string
    savedStateID: string
}

const SpecialPaperLibraryComp: React.FC<ISpecialPaperLibrary> = ({gradeName, category, paperID, savedStateID}) => {
    return (
        <PaperWrapperComp>
            <HeadlessComp
                baseURL={`/special/library_paper_questions/${gradeName}/${category}/${paperID}/${savedStateID}`}
                gradeName={gradeName}
                paperID={paperID}
            />
        </PaperWrapperComp>
    );
}

export default SpecialPaperLibraryComp;