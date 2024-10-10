export default function CardLevelBtn({step, again, hard, good, easy}) {
    const handleLevelClick = () =>{
        if(step === 0){

        } else if(step === 1){

        } else if(step === 2){

        } else {
            return;
        }
    }
    return (
        <div className="w-100 position-fixed bottom-0 left-0 d-flex flex-row justify-content-center gap-3 border-top text-reponsive bg-black">
            <div className="d-flex flex-column" onClick={handleLevelClick}>
                <p className="mb-0 text-center">{again}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Again</div>
            </div>
            <div className="d-flex flex-column" onClick={handleLevelClick}>
                <p className="mb-0 text-center">{hard}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Hard</div>
            </div>
            <div className="d-flex flex-column" onClick={handleLevelClick}>
                <p className="mb-0 text-center">{good}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Good</div>
            </div>
            <div className="d-flex flex-column" onClick={handleLevelClick}>
                <p className="mb-0 text-center">{easy}</p>
                <div className="px-3 py-1 mb-2 rounded-5 border-1 border-secondary bg-light text-dark cursor-pointer">Easy</div>
            </div>
        </div>
    )
}