export default function CardShowAnswerBtn({onStopCounter}) {
    return (
        <div className="w-100 position-fixed bottom-0 left-0 justify-content-center bg-black px-5">
            <div className="mx-auto py-2 mb-4 rounded-5 bg-light text-dark cursor-pointer w-md-25 text-center" onClick={onStopCounter}>Show Answer</div>
        </div>
    )
}