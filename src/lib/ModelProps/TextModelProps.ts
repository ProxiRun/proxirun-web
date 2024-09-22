

export interface TextModelProps {
    system_prompt: string;
    user_prompt: string;
}

export class TextModelPropsUtils {
    public static default(): TextModelProps {
        return {
            system_prompt: "You are a helpful assistant",
            user_prompt: ""
        }
    }
}