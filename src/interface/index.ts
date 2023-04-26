export interface ProductType {
    id: number;
    title: string;
    image: {
        "mobile-thumbnail": string;
        width: number;
        height: number;
    };
    credits: string[];
    desc: string;
    is_brightness: boolean;
}

