export class MicroKanban {
    constructor() {
        this.columns = {
            nextUp: [],
            inProgress: [],
            done: []
        };
    }

    addTask(task, column = 'nextUp') {
        if (this.columns[column]) {
            this.columns[column].push(task);
        }
    }

    moveTask(task, fromColumn, toColumn) {
        const index = this.columns[fromColumn].indexOf(task);
        if (index > -1) {
            this.columns[fromColumn].splice(index, 1);
            this.columns[toColumn].push(task);
        }
    }

    getBoard() {
        return this.columns;
    }
}
