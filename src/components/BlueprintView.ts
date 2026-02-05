export class BlueprintView {
    constructor(private containerId: string, private data: any) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Simulate some "real" contributors for the social feel
        const contributors = [
            { name: "Sarah L.", color: "#f472b6" },
            { name: "Marc D.", color: "#60a5fa" }
        ];

        container.innerHTML = `
      <div class="blueprint-header" style="margin-bottom: 2rem;">
        <p style="font-size: 1.1rem; opacity: 0.8; margin-bottom: 1rem;">${this.data.mission}</p>
        <div class="meta-tags" style="display: flex; gap: 1rem; font-size: 0.9rem;">
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">📅 ${this.data.moral_contract.duration_months} mois</span>
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">🔥 Intensité: ${this.data.moral_contract.intensity}</span>
        </div>
      </div>

      <h3>Besoins du projet</h3>
      <div class="blueprint-grid">
        ${this.data.stack_requirements.map((req: any) => this.createReqCard(req)).join('')}
      </div>

      <div class="contributors-section" style="margin-top: 2rem; border-top: 1px solid var(--surface-border); padding-top: 1rem;">
        <small style="text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Membres actifs</small>
        <div class="avatars" style="display: flex; margin-top: 0.5rem; gap: -10px;">
            ${contributors.map(c => `
                <div title="${c.name}" style="
                    width: 32px; height: 32px; 
                    background: ${c.color}; 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    font-size: 0.8rem; font-weight: bold; 
                    border: 2px solid var(--bg-gradient-start);
                    margin-right: -8px;
                    cursor: help;
                ">${c.name[0]}</div>
            `).join('')}
            <div style="
                width: 32px; height: 32px; 
                background: #334155; 
                border-radius: 50%; 
                display: flex; align-items: center; justify-content: center; 
                font-size: 0.7rem; 
                border: 2px solid var(--bg-gradient-start);
                margin-right: -8px;
            ">+5</div>
        </div>
      </div>
    `;
    }

    private createReqCard(req: any): string {
        const isOpen = req.status === 'open';
        const statusClass = isOpen ? 'open' : 'filled';
        const label = isOpen ? 'Recherche' : 'Pourvu';

        return `
      <div class="req-card ${statusClass}">
        <div>
          <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">${req.role}</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">
            ${req.skills.join(' • ')}
          </div>
        </div>
        <div class="status-badge ${statusClass}">
          ${label}
        </div>
      </div>
    `;
    }
}
