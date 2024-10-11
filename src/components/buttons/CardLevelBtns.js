export default function CardLevelBtn({ again, hard, good, easy, onLevelClick }) {
    return (
        <div className="w-100 fixed-bottom d-flex flex-row justify-content-center gap-3 text-reponsive border-top bg-black">
            <div className="d-flex flex-column" onClick={() => onLevelClick('again', again)}>
                <p className="mb-0 text-center">{again}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Again</div>
            </div>
            <div className="d-flex flex-column" onClick={() => onLevelClick('hard', hard)}>
                <p className="mb-0 text-center">{hard}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Hard</div>
            </div>
            <div className="d-flex flex-column" onClick={() => onLevelClick('good', good)}>
                <p className="mb-0 text-center">{good}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Good</div>
            </div>
            <div className="d-flex flex-column" onClick={() => onLevelClick('easy', easy)}>
                <p className="mb-0 text-center">{easy}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Easy</div>
            </div>
        </div>
    );
}
