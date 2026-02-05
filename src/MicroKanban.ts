export interface KanbanTask {
    id: number | string;
    title: string;
    assignee?: string;
    [key: string]: any;
}

export type KanbanColumn = 'nextUp' | 'inProgress' | 'done';

export class MicroKanban {
    private columns: Record<string, KanbanTask[]>;

    constructor() {
        this.columns = {
            nextUp: [],
            inProgress: [],
            done: []
        };
    }

    addTask(task: KanbanTask, column: KanbanColumn = 'nextUp') {
        if (this.columns[column]) {
            this.columns[column].push(task);
        }
    }

    moveTask(task: KanbanTask, fromColumn: KanbanColumn, toColumn: KanbanColumn) {
        if (!this.columns[fromColumn] || !this.columns[toColumn]) return;

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
