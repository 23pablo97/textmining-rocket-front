import { User } from "./User";

export interface Document {
    _id: string;
    resource_name: string;
    resource_description: string;
    resource_type: string;
    resource_language: string;
    file_path: string;
    version: string;
    resource_size: number;
    created_by: User;
    created_at: string;
}

