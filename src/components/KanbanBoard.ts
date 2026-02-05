import { MicroKanban, KanbanColumn, KanbanTask } from '../MicroKanban';

export class KanbanBoard {
    constructor(
        private containerId: string,
        private kanban: MicroKanban,
        private onTaskMove: () => void // Callback to trigger re-render
    ) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = ''; // Clear current
        const columns = this.kanban.getBoard();
        const columnOrder: KanbanColumn[] = ['nextUp', 'inProgress', 'done'];

        columnOrder.forEach((colId) => {
            const tasks = columns[colId] || []; // Safely get tasks
            const colDiv = document.createElement('div');
            colDiv.className = `kanban-column col-${colId}`;

            const title = document.createElement('h3');
            title.textContent = colId.replace(/([A-Z])/g, ' $1').trim();
            colDiv.appendChild(title);

            tasks.forEach((task: KanbanTask) => {
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card';
                taskCard.innerHTML = `
            <div class="task-header">
                <strong>${task.title}</strong>
                <small>${task.assignee || 'Unassigned'}</small>
            </div>
            <div class="task-actions">
                ${this.createMoveButtons(colId)}
            </div>
        `;

                // Add event listeners for buttons
                const prevBtn = taskCard.querySelector('.btn-prev');
                const nextBtn = taskCard.querySelector('.btn-next');

                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        this.moveTask(task, colId, 'prev');
                    });
                }
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        this.moveTask(task, colId, 'next');
                    });
                }

                colDiv.appendChild(taskCard);
            });

            container.appendChild(colDiv);
        });
    }

    private createMoveButtons(currentCol: KanbanColumn): string {
        let buttons = '';
        if (currentCol === 'inProgress' || currentCol === 'done') {
            buttons += `<button class="btn-prev" title="Move back">←</button>`;
        }
        if (currentCol === 'nextUp' || currentCol === 'inProgress') {
            buttons += `<button class="btn-next" title="Advance">→</button>`;
        }
        return buttons;
    }

    private moveTask(task: KanbanTask, currentCol: KanbanColumn, direction: 'next' | 'prev') {
        const order: KanbanColumn[] = ['nextUp', 'inProgress', 'done'];
        const currentIndex = order.indexOf(currentCol);
        let targetIndex = currentIndex;

        if (direction === 'next') targetIndex++;
        else targetIndex--;

        if (targetIndex >= 0 && targetIndex < order.length) {
            this.kanban.moveTask(task, currentCol, order[targetIndex]);
            this.onTaskMove(); // Trigger re-render
        }
    }
}
