


export enum TaskType {
    TextGeneration = "Text Generation",
    ImageGeneration = "Image Generation",
    VoiceGeneration = "Voice Generation",
}

export class TaskTypeUtils {
    public static to_string(task_type: TaskType): string {
        switch (task_type) {
            case TaskType.TextGeneration: return "Text Generation"
            case TaskType.ImageGeneration: return "Image Generation"
            case TaskType.VoiceGeneration: return "Voice Generation"
        }
    }

    public static from_id(id: number): TaskType {
        switch (id) {
            case 0: return TaskType.TextGeneration
            case 1: return TaskType.ImageGeneration
            case 2: return TaskType.VoiceGeneration
            default: throw new Error("unknown id for TaskType")
        }
    }

    public static to_list(): TaskType[] {
        return [
            TaskType.TextGeneration,
            TaskType.ImageGeneration,
            TaskType.VoiceGeneration,
        ]
    }
}



export const AVAILABLE_MODELS: Record<TaskType, string[]> = {
    [TaskType.TextGeneration]: ["ChatGpt", "Llama"],
    [TaskType.ImageGeneration]: ["Flux", "Stable Diffusion"],
    [TaskType.VoiceGeneration]: ["Dunno"],
};