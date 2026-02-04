export class BlueprintView {
    constructor(private containerId: string, private data: any) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
      <div class="blueprint-summary">
        <p><strong>Mission:</strong> ${this.data.mission}</p>
        <div class="blueprint-details">
          <div class="detail-group">
            <h4>Contrat Moral</h4>
            <ul>
              <li>Durée: ${this.data.moral_contract.duration_months} mois</li>
              <li>Intensité: ${this.data.moral_contract.intensity}</li>
            </ul>
          </div>
          <div class="detail-group">
            <h4>Stack Technique</h4>
            <ul class="stack-list">
              ${this.data.stack_requirements.map((req: any) => `
                <li class="req-item ${req.status}">
                  <span class="role">${req.role}</span>
                  <span class="skills">${req.skills.join(', ')}</span>
                  <span class="status-badge ${req.status}">${req.status}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    }
}
