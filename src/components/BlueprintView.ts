export class BlueprintView {
  constructor(private containerId: string, private data: any) { }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="blueprint-summary">
        <p class="mission-statement"><strong>Mission :</strong> ${this.data.mission}</p>
        <div class="blueprint-details">
          <div class="detail-group">
            <h4>Le Contrat Moral</h4>
            <ul>
              <li>Durée : ${this.data.moral_contract.duration_months} mois</li>
              <li>Rythme : ${this.data.moral_contract.intensity}</li>
            </ul>
          </div>
          <div class="detail-group">
            <h4>L'Équipe (Besoin Vital)</h4>
            <ul class="stack-list">
              ${this.data.stack_requirements.map((req: any) => `
                <li class="req-item ${req.status}">
                  <div class="req-info">
                    <span class="role">${req.role}</span>
                    <span class="skills">${req.skills.join(', ')}</span>
                  </div>
                  <div class="req-actions">
                    <span class="status-badge ${req.status}">${req.status === 'open' ? 'Manquant' : 'Pourvu'}</span>
                    ${req.status === 'open' ? '<button class="btn-invite">Inviter +</button>' : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
