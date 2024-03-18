export interface IDog {
    _id?: string;
    name: string;
    age: number;
    gender: 'male' | 'female';
    breed: string;
    size: 'small' | 'medium' | 'big';
    vaccine: boolean;
    photos: string[];
    createdAt?: Date;
}