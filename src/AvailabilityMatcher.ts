export interface User {
    id: string;
    skills: string[];
    availability: number[];
}

export interface Task {
    id: string;
    requiredSkills: string[];
    requiredHours: number[];
}

export class AvailabilityMatcher {
    private alpha = 0.6;
    private beta = 0.4;

    calculateScore(volunteer: User, task: Task): number {
        const skillScore = this.calculateSkillSimilarity(volunteer.skills, task.requiredSkills);
        const timeScore = this.calculateTimeIntersection();
        return (this.alpha * skillScore) + (this.beta * timeScore);
    }

    private calculateSkillSimilarity(vSkills: string[], tSkills: string[]): number {
        const intersection = vSkills.filter(skill => tSkills.includes(skill));
        return tSkills.length > 0 ? intersection.length / tSkills.length : 0;
    }

    private calculateTimeIntersection(): number {
        return 1.0;
    }
}
