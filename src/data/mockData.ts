export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    sponsor?: string;
    impact: string;
    status: 'recruiting' | 'in-progress' | 'completed';
}

export const mockProjects: Project[] = [
    {
        id: 'van-life',
        title: 'Van Life Connecté',
        description: 'Transformation d\'un Peugeot Boxer en maison connectée autonome en énergie.',
        image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
        sponsor: 'Leroy Merlin',
        impact: '🌱 Autonomie totale',
        status: 'in-progress'
    },
    {
        id: 'potager-iot',
        title: 'Potager Urbain IA',
        description: 'Système d\'arrosage intelligent pour toits parisiens, piloté par Raspberry Pi.',
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800',
        sponsor: 'Truffaut',
        impact: '🥦 50kg légumes/an',
        status: 'recruiting'
    },
    {
        id: 'arcade-recycle',
        title: 'Borne Arcade Recyclée',
        description: 'Construction d\'une borne d\'arcade à partir de bois de récupération et vieux PC.',
        image: 'https://images.unsplash.com/photo-1511882150382-421056ac8d89?auto=format&fit=crop&q=80&w=800',
        impact: '♻️ 100% Recyclé',
        status: 'completed'
    }
];
