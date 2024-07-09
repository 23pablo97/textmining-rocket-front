import { User } from "./User";

export interface Service {
    _id: string;
    config: any;
    config_path: string;
    name: string,
    template: string,
    created_by: User;
    created_at: string;
}
