import { useLocation } from 'react-router-dom';
import HomeLink from "./HomeLink";
import DeckLink from "./DeckLink";
import MyDeckLink from "./MyDeckLink";
import ShareWithMeLink from "./ShareWMeLink";

export default function DeckRoute() {
    const location = useLocation();
    const showMyDecksLink = location.pathname.includes('my-decks');
    const showShareWithMeLink = location.pathname.includes('share-with-me');

    return (
        <div className="px-lg-3 d-wrapper gap-3 bg-primary-cus rounded-1">
            <HomeLink />
            <span>/</span>
            <DeckLink />
            {showMyDecksLink && (
                <>
                    <span>/</span>
                    <MyDeckLink />  
                </>
            )}
            {showShareWithMeLink && (
                <>
                    <span>/</span>
                    <ShareWithMeLink />
                </>
            )}
        </div>
    );
}
