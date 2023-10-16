class Stack {

    constructor() {
        this.waitingList = []
    }

    insert(elt) {
        this.waitingList.push(elt)
    }

    pop() {
        return this.waitingList.pop();
    }


    isEmpty() {
        return this.waitingList.length == 0;
    }

}