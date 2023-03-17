export interface Course {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    previewImageLink: string;
    rating: number;
    meta: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        };
    };
    lessons: Lesson[];
    containsLockedLessons: boolean;
}
export interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta: null;
}
