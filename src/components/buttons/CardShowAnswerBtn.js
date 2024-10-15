export default function CardShowAnswerBtn({onStopCounter}) {
    return (
        <div className="w-100 fixed-bottom d-flex left-0 px-5 py-3 border-t-1 bg-black" style={{height: '80px'}}>
            <div className="d-flex align-items-center justify-content-center mx-auto rounded-5 bg-light text-dark cursor-pointer w-md-25 text-reponsive" onClick={onStopCounter}>Show Answer</div>
        </div>
    )
}