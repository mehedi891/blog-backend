export interface TResgister {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface TLoginUser {
    email:string;
    password:string;
}