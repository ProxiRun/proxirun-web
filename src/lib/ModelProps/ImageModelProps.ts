

export enum AspectRatio {
    Portrait = "Portrait",
    Landscape = "Landscape",
    Square = "Square"

}


export interface ImageModelProps {
    positive_prompt: string;
    negative_prompt: string;
    aspect_ratio: AspectRatio,
    config_scale: number,
    nb_steps: number
}

export class ImageModelPropsUtils {
    public static default(): ImageModelProps {
        return {
            positive_prompt: "",
            negative_prompt: "",
            aspect_ratio: AspectRatio.Portrait,
            config_scale: 8,
            nb_steps: 25
        }
    }
}