import { Project, mockProjects } from '../data/mockData';

export class Showcase {
    constructor(private containerId: string) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
      <div class="showcase-grid">
        ${mockProjects.map(project => this.createProjectCard(project)).join('')}
      </div>
    `;
    }

    private createProjectCard(project: Project): string {
        return `
      <div class="card showcase-card">
        <div class="card-image" style="background-image: url('${project.image}')">
          <div class="card-badges">
            <span class="status-badge ${project.status}">${this.translateStatus(project.status)}</span>
            ${project.sponsor ? `<span class="sponsor-badge">Sponsorisé par ${project.sponsor}</span>` : ''}
          </div>
        </div>
        <div class="card-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="card-footer">
            <span class="impact-metric">${project.impact}</span>
            <button class="btn-discover">Découvrir</button>
          </div>
        </div>
      </div>
    `;
    }

    private translateStatus(status: string): string {
        switch (status) {
            case 'recruiting': return '🔍 Recherche Profils';
            case 'in-progress': return '🚀 En Chantier';
            case 'completed': return '🏆 Terminé';
            default: return status;
        }
    }
}
