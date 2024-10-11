class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(card, timeToShow) {
        this.heap.push({ card, timeToShow });
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (element.timeToShow >= parent.timeToShow) break;

            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    remove() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.timeToShow < element.timeToShow) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.timeToShow < element.timeToShow) ||
                    (swap !== null && rightChild.timeToShow < leftChild.timeToShow)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    getHeap() {
        return this.heap;
    }
}

const minHeap = new MinHeap();

const selectCardTime = (card, selectedMinutes) => {
    const currentTime = Date.now();
    const timeDelay = selectedMinutes * 60 * 1000;
    const timeToShow = currentTime + timeDelay;
    minHeap.insert(card, timeToShow);
};

const displayNextCard = () => {
    if (!minHeap.isEmpty()) {
        const nextCard = minHeap.remove();
        return { status: 'success', card: nextCard.card };
    } else {
        return { status: 'empty', card: null };
    }
};

const getHeap = () => {
    return minHeap.getHeap();
};

export { selectCardTime, displayNextCard, getHeap };
