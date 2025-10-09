export interface User {
    id: string;
    email: string;
}

export interface Session {
    session: {
        userId: string;
        expiresAt: Date;
    };
    user: User;
}