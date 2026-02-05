export interface User {
  id: string;
  skills: string[];
  availability: number[]; // e.g., hours per week availability map
}

export interface Task {
  id: string;
  requiredSkills: string[];
  requiredHours: number[];
}

export class AvailabilityMatcher {
  private alpha = 0.6; // Skill weight
  private beta = 0.4;  // Time weight

  calculateScore(volunteer: User, task: Task): number {
    const skillScore = this.calculateSkillSimilarity(volunteer.skills, task.requiredSkills);
    const timeScore = this.calculateTimeIntersection(volunteer.availability, task.requiredHours);

    return (this.alpha * skillScore) + (this.beta * timeScore);
  }

  private calculateSkillSimilarity(vSkills: string[], tSkills: string[]): number {
    // Simplified Cosine Similarity or Intersection/Union
    const intersection = vSkills.filter(skill => tSkills.includes(skill));
    return intersection.length / tSkills.length;
  }

  private calculateTimeIntersection(_vTime: number[], _tTime: number[]): number {
    // Simplified intersection logic
    // Just returning a dummy 1.0 for perfect match simulation
    return 1.0;
  }
}
