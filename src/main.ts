import './style.css'
import { MicroKanban } from './MicroKanban'
import blueprint from './ProjectBlueprint.json'
import { BlueprintView } from './components/BlueprintView'
import { KanbanBoard } from './components/KanbanBoard'
import { MatcherSimulator } from './components/MatcherSimulator'
import { ActivityFeed } from './components/ActivityFeed'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>Common Ground</h1>
    <p class="subtitle">Le GitHub des Passions</p>
    <div style="margin-top: 2rem;">
      <button style="padding: 12px 24px; background: white; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; color: var(--primary);">Commencer un projet</button>
    </div>
  </header>
  
  <main>
    <section id="blueprint-section">
      <div class="card">
        <h2>Project Blueprint</h2>
        <div id="blueprint-content"></div>
      </div>
    </section>

    <section id="kanban-section">
      <div class="card" style="background: transparent; border: none; box-shadow: none; padding: 0;">
        <h2 style="padding-left: 0; border: none;">Micro Kanban</h2>
        <div id="kanban-board" class="kanban-board">
          <!-- Components will be injected here -->
        </div>
      </div>
    </section>

    <section id="matcher-section">
      <div class="card">
        <h2>Availability Matcher</h2>
        <div id="matcher-container">
          <!-- Components will be injected here -->
        </div>
      </div>
    </section>

    <section id="activity-section">
        <div class="card">
           <div id="activity-feed"></div>
        </div>
    </section>
  </main>
    
  <footer style="text-align: center; margin-top: 4rem; opacity: 0.5; font-size: 0.8rem;">
    <p>&copy; 2024 Common Ground. Built for the future.</p>
  </footer>
`

// 1. Initialize & Render Blueprint
const blueprintView = new BlueprintView('blueprint-content', blueprint);
blueprintView.render();

// 2. Initialize & Render Kanban
const kanban = new MicroKanban();
// Initial Data
// Initial Data
kanban.addTask({ id: 1, title: 'Valider les statuts asso', assignee: 'Marie C.' }, 'done');
kanban.addTask({ id: 2, title: 'Achat terreau (200L)', assignee: 'Thomas B.' }, 'done');
kanban.addTask({ id: 3, title: 'Design des plans des bacs', assignee: 'Lucas V.' }, 'inProgress');
kanban.addTask({ id: 4, title: 'Contacter la Mairie (permis)', assignee: 'Sarah L.' }, 'inProgress');
kanban.addTask({ id: 5, title: 'Récupérer palettes bois', assignee: 'Marc D.' }, 'nextUp');
kanban.addTask({ id: 6, title: 'Créer page Instagram', assignee: 'Elise' }, 'nextUp');
kanban.addTask({ id: 7, title: 'Budget prévisionnel Q2', assignee: 'Karim' }, 'nextUp');
kanban.addTask({ id: 8, title: 'Organiser apéro lancement', assignee: undefined }, 'nextUp');

const kanbanBoard = new KanbanBoard('kanban-board', kanban, () => {
  kanbanBoard.render(); // Re-render on update
});
kanbanBoard.render();

// 3. Initialize & Render Matcher Simulator
const matcherSim = new MatcherSimulator('matcher-container');
matcherSim.render();

// 4. Initialize & Render Activity Feed
const activityFeed = new ActivityFeed('activity-feed');
activityFeed.render();
