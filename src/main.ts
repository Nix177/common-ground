import './style.css'
import { MicroKanban } from './MicroKanban'
import blueprint from './ProjectBlueprint.json'
import { BlueprintView } from './components/BlueprintView'
import { KanbanBoard } from './components/KanbanBoard'
import { MatcherSimulator } from './components/MatcherSimulator'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>Common Ground</h1>
    <p class="subtitle">Le Github des Passions</p>
  </header>
  
  <main>
    <section id="blueprint-section">
      <h2>Project Blueprint</h2>
      <div id="blueprint-content" class="card"></div>
    </section>

    <section id="kanban-section">
      <h2>Micro Kanban</h2>
      <div id="kanban-board" class="kanban-board">
        <!-- Components will be injected here -->
      </div>
    </section>

    <section id="matcher-section">
      <h2>Availability Matcher</h2>
      <div class="card" id="matcher-container">
        <!-- Components will be injected here -->
      </div>
    </section>
  </main>
`

// 1. Initialize & Render Blueprint
const blueprintView = new BlueprintView('blueprint-content', blueprint);
blueprintView.render();

// 2. Initialize & Render Kanban
const kanban = new MicroKanban();
// Initial Data
kanban.addTask({ id: 1, title: 'Créer le design system', assignee: 'Alice' }, 'nextUp');
kanban.addTask({ id: 2, title: 'Définir les rôles', assignee: 'Bob' }, 'inProgress');
kanban.addTask({ id: 3, title: 'Initialiser le repo', assignee: 'Charlie' }, 'done');

const kanbanBoard = new KanbanBoard('kanban-board', kanban, () => {
  kanbanBoard.render(); // Re-render on update
});
kanbanBoard.render();

// 3. Initialize & Render Matcher Simulator
const matcherSim = new MatcherSimulator('matcher-container');
matcherSim.render();
