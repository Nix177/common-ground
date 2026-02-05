import { AvailabilityMatcher, User, Task } from '../AvailabilityMatcher';

export class MatcherSimulator {
    private matcher = new AvailabilityMatcher();
    private availableSkills = ['manage', 'gardening', 'transport', 'cooking', 'finance'];

    // State
    private selectedSkills: string[] = ['gardening'];
    private currentTaskReqs: string[] = ['gardening', 'transport'];

    constructor(private containerId: string) { }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const volunteer: User = {
            id: 'sim-user',
            skills: this.selectedSkills,
            availability: [] // ignored for now
        };

        const task: Task = {
            id: 'sim-task',
            requiredSkills: this.currentTaskReqs,
            requiredHours: [] // ignored for now
        };

        const score = this.matcher.calculateScore(volunteer, task);

        container.innerHTML = `
        <div class="matcher-layout">
            <div class="matcher-controls">
                <h4>Volunteer Skills</h4>
                <div class="skills-form">
                    ${this.renderCheckboxes(this.availableSkills, this.selectedSkills)}
                </div>
            </div>
            
            <div class="matcher-visual">
                <div class="score-display">
                    <span class="score-label">Match Score</span>
                    <span class="score-value ${this.getScoreClass(score)}">${score.toFixed(2)}</span>
                </div>
                <div class="match-details">
                    <small>Required: ${this.currentTaskReqs.join(', ')}</small>
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
        <label class="skill-checkbox">
            <input type="checkbox" value="${skill}" ${selected.includes(skill) ? 'checked' : ''}>
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
