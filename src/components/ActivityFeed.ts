export class ActivityFeed {
    constructor(private containerId: string) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const activities = [
            { user: 'Marie C.', action: 'a rejoint le projet', time: 'À l\'instant', type: 'join' },
            { user: 'Thomas B.', action: 'a terminé "Achat terreau"', time: 'Il y a 2h', type: 'task' },
            { user: 'Lucas V.', action: 'a partagé un fichier', time: 'Il y a 4h', type: 'file' },
            { user: 'Sarah L.', action: 'a commenté sur "Permis"', time: 'Il y a 5h', type: 'comment' },
            { user: 'Système', action: 'Nouvelle étape "Semis" débloquée', time: 'Hier', type: 'milestone' }
        ];

        container.innerHTML = `
            <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <h3 style="margin: 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Activité Récente</h3>
                <span style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></span>
            </div>
            <div class="activity-list" style="display: flex; flex-direction: column; gap: 1rem;">
                ${activities.map(act => this.createActivityItem(act)).join('')}
            </div>
        `;
    }

    private createActivityItem(act: any): string {
        return `
            <div class="activity-item" style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.5rem; border-radius: 8px; transition: background 0.2s;">
                <div class="activity-icon" style="
                    width: 32px; height: 32px; 
                    background: rgba(255,255,255,0.05); 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.9rem;
                    color: ${this.getIconColor(act.type)};
                ">
                    ${this.getIcon(act.type)}
                </div>
                <div class="activity-content" style="flex: 1;">
                    <p style="margin: 0; font-size: 0.9rem;">
                        <strong style="color: #f1f5f9;">${act.user}</strong> ${act.action}
                    </p>
                    <small style="color: var(--text-muted); font-size: 0.75rem;">${act.time}</small>
                </div>
            </div>
        `;
    }

    private getIcon(type: string): string {
        switch (type) {
            case 'join': return '👋';
            case 'task': return '✅';
            case 'file': return '📂';
            case 'comment': return '💬';
            case 'milestone': return '🏆';
            default: return '•';
        }
    }

    private getIconColor(type: string): string {
        switch (type) {
            case 'join': return '#f472b6';
            case 'task': return '#4ade80';
            case 'milestone': return '#fbbf24';
            default: return '#94a3b8';
        }
    }
}
