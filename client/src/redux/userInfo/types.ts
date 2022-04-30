import { User } from "../../TS types/Types";

export type UserInfo = User & { isAuthenticated: boolean };
