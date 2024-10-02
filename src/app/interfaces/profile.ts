export interface Profile {
    name: string;
    lastname: string;
    preference: 'Pista dura' | 'Tierra batida' | 'Cesped'; // valores limitados para preferencia
    level: 'Novato' | 'Principiante' | 'Intermedio' | 'Avanzado' | 'Profesional'; // valores limitados para nivel
    matchesPlayed: number;
    matchesWon: number;
    about: string;
    availability?: string[];
    sex?: string;
    birthday?: Date;
    age?: number;
    token?: string;
}
