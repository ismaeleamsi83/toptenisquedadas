export interface Profile {
    name: string;
    lastname: string;
    password: string;
    preference: 'Pista dura' | 'Tierra batida' | 'Cesped'; // valores limitados para preferencia
    level: 'Novato' | 'Principiante' | 'Intermedio' | 'Avanzado' | 'Profesional'; // valores limitados para nivel
    matchesPlayed: number;
    matchesWon: number;
    about: string;
    availability?: string[];
    sex?: string;
    birthday?: Date;
    age?: number;
    population?: string;
    imageUrl?: any;
    fileRaw?:any;
    fileName?:any;
    token?: string;
    notes?:[];
}
