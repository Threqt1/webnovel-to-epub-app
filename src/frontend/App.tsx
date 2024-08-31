import AddNovel from "./views/AddNovel/AddNovel";
import BaseOptionsPrompt from "./views/AddNovel/BaseOptionsPrompt";
import NovelsList from "./views/NovelsList/NovelsList";

export default function App() {
    return (
        <div className="p-4 overflow-hidden w-full h-full">
            <AddNovel />
        </div>
    );
}
