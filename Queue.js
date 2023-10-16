class Queue {

    constructor() {
        this.waintingList = []
    }

    insert(elt) {
        this.waintingList.unshift(elt);
    }

    pop() {
        return this.waintingList.pop();
    }

    isEmpty() {
        return this.waintingList.length > 0;
    }

}