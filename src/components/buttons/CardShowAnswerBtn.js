export default function CardShowAnswerBtn({onStopCounter}) {
    return (
        <div className="w-100 fixed-bottom d-flex left-0  px-5 py-3">
            <div className="mx-auto py-2 rounded-5 bg-light text-dark cursor-pointer w-md-25 text-center text-reponsive" onClick={onStopCounter}>Show Answer</div>
        </div>
    )
}