import './style.css'
// @ts-ignore
import { MicroKanban } from './MicroKanban.js'
import blueprint from './ProjectBlueprint.json'
import { BlueprintView } from './components/BlueprintView'
import { KanbanBoard } from './components/KanbanBoard.js'
import { MatcherSimulator } from './components/MatcherSimulator.js'
import { Showcase } from './components/Showcase.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <div class="hero-content">
        <h1>Common Ground</h1>
        <p class="subtitle">Le Github des Passions : De l'idée à l'action collaborative.</p>
    </div>
  </header>
  
  <main>
    <section id="showcase-section" style="margin-bottom: 4rem;">
      <div class="section-header">
          <h2>La Vitrine <span style="font-size:0.6em; opacity:0.7; font-weight:400; margin-left:1rem;">(Projets en Vedette)</span></h2>
      </div>
      <div id="showcase-container"></div>
    </section>

    <section id="blueprint-section">
      <div class="section-header">
          <h2>L'ADN du Projet <span style="font-size:0.6em; opacity:0.7; font-weight:400; margin-left:1rem;">(Mission & Besoins)</span></h2>
      </div>
      <div id="blueprint-content" class="card"></div>
    </section>

    <section id="kanban-section">
      <div class="section-header">
          <h2>Le Chantier <span style="font-size:0.6em; opacity:0.7; font-weight:400; margin-left:1rem;">(Tâches en Cours)</span></h2>
      </div>
      <div id="kanban-board" class="kanban-board"></div>
    </section>

    <section id="matcher-section">
      <div class="section-header">
          <h2>Rejoindre l'Équipe <span style="font-size:0.6em; opacity:0.7; font-weight:400; margin-left:1rem;">(Matchmaking)</span></h2>
      </div>
      <div class="card" id="matcher-container"></div>
    </section>
  </main>

  <footer style="margin-top: 6rem; text-align: center; color: var(--text-muted); opacity: 0.5; padding-bottom: 2rem;">
    <p>&copy; 2024 Common Ground - Expérience Collaborative</p>
  </footer>
`

// Showcase
const showcase = new Showcase('showcase-container');
showcase.render();

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
