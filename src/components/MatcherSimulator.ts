import { AvailabilityMatcher, User, Task } from '../AvailabilityMatcher';

export class MatcherSimulator {
    private matcher = new AvailabilityMatcher();
    private availableSkills = ['Gestion', 'Jardinage', 'Transport', 'Cuisine', 'Finance'];

    // State
    private selectedSkills: string[] = ['Jardinage'];
    private currentTaskReqs: string[] = ['Jardinage', 'Transport'];

    constructor(private containerId: string) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const volunteer: User = {
            id: 'sim-user',
            skills: this.selectedSkills,
            availability: []
        };

        const task: Task = {
            id: 'sim-task',
            requiredSkills: this.currentTaskReqs,
            requiredHours: []
        };

        const score = this.matcher.calculateScore(volunteer, task);

        container.innerHTML = `
        <div class="matcher-layout" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
            
            <div class="matcher-card" style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 12px; border: 1px solid var(--surface-border);">
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <div style="width: 64px; height: 64px; background: #818cf8; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
                        AL
                    </div>
                    <div>
                        <h3 style="font-size: 1.25rem;">Alexandre L.</h3>
                        <p style="color: var(--secondary); margin: 0;">Bénévole depuis 2023</p>
                    </div>
                </div>

                <h4 style="margin-bottom: 1rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--text-muted);">Compétences</h4>
                <div class="skills-form" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${this.renderCheckboxes(this.availableSkills, this.selectedSkills)}
                </div>
            </div>
            
            <div class="matcher-visual" style="text-align: center; background: rgba(0,0,0,0.2); padding: 2rem; border-radius: 12px; display: flex; flex-direction: column; justify-content: center;">
                <div class="score-display">
                    <span class="score-label">Compatibilité Mission</span>
                    <span class="score-value ${this.getScoreClass(score)}" style="font-size: 5rem; display: block; margin: 1rem 0;">${(score * 100).toFixed(0)}%</span>
                </div>
                <div class="match-details" style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--surface-border);">
                    <small style="color: var(--text-muted);">Besoin: ${this.currentTaskReqs.join(', ')}</small>
                </div>
            </div>
        </div>
    `;

        // Re-attach listeners
        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.selectedSkills.push(target.value);
                } else {
                    this.selectedSkills = this.selectedSkills.filter(s => s !== target.value);
                }
                this.render(); // Re-render on change
            });
        });
    }

    private renderCheckboxes(all: string[], selected: string[]): string {
        return all.map(skill => `
        <label class="skill-checkbox" style="padding: 8px 16px; background: ${selected.includes(skill) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; border-radius: 20px; cursor: pointer; transition: all 0.2s;">
            <input type="checkbox" value="${skill}" ${selected.includes(skill) ? 'checked' : ''} style="display: none;">
            ${skill}
        </label>
      `).join('');
    }

    private getScoreClass(score: number): string {
        if (score >= 0.8) return 'score-high';
        if (score >= 0.5) return 'score-med';
        return 'score-low';
    }
}
