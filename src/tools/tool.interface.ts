export interface Tool<Input = any, Output = any> {
    name: string;
    description: string;
    execute(input: Input): Promise<Output>;
}