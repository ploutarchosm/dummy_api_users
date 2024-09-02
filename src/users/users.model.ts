import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export enum UserRole {
    Owner = 'Owner', 
    Admin = 'Admin', 
    Dev = 'Dev', 
    Translator= 'Translator', 
    User = 'User', 
    Tester= 'Tester', 
}

export enum UserStatus {
    Active = 'Active', 
    Unverify = 'Unverify', 
    Inactive = 'Inactive', 
    Deleted = 'Deleted', 
    Banned = 'Banned'
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: UserStatus;
    role: UserRole;
}