import './style.css'
// @ts-ignore
import { MicroKanban } from './MicroKanban.js'
import blueprint from './ProjectBlueprint.json'
import { BlueprintView } from './components/BlueprintView'
import { KanbanBoard } from './components/KanbanBoard'
import { MatcherSimulator } from './components/MatcherSimulator'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <div class="hero-content">
        <h1>Common Ground</h1>
        <p class="subtitle">Le Github des Passions : De l'idée à l'action collaborative.</p>
    </div>
  </header>
  
  <main>
    <section id="blueprint-section">
      <div class="section-header">
          <h2>Project Blueprint</h2>
      </div>
      <div id="blueprint-content" class="card"></div>
    </section>

    <section id="kanban-section">
      <div class="section-header">
          <h2>Micro Kanban</h2>
      </div>
      <div id="kanban-board" class="kanban-board"></div>
    </section>

    <section id="matcher-section">
      <div class="section-header">
          <h2>Availability Matcher</h2>
      </div>
      <div class="card" id="matcher-container"></div>
    </section>
  </main>

  <footer style="margin-top: 6rem; text-align: center; color: var(--text-muted); opacity: 0.5; padding-bottom: 2rem;">
    <p>&copy; 2024 Common Ground - Prototype Investor Edition</p>
  </footer>
`

// Blueprint
const blueprintView = new BlueprintView('blueprint-content', blueprint);
blueprintView.render();

// Kanban
const kanban = new MicroKanban();
kanban.addTask({ id: 1, title: 'Finaliser le pitch deck', assignee: 'Nicolas' }, 'nextUp');
kanban.addTask({ id: 2, title: 'Design System (V2)', assignee: 'Alice' }, 'inProgress');
kanban.addTask({ id: 3, title: 'Core Matcher Engine', assignee: 'Charlie' }, 'done');

const kanbanBoard = new KanbanBoard('kanban-board', kanban, () => kanbanBoard.render());
kanbanBoard.render();

// Matcher
const matcherSim = new MatcherSimulator('matcher-container');
matcherSim.render();
