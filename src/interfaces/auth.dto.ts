export interface LoginReqBody {
    nik: string;
    password: string;
}

export interface ValidateTokenReqBody {
    token: string;
}

export interface ValidateTokenResData {
    nik: string;
    profile_photo: string;
    user_role: string;
}

export interface LoginResdata extends ValidateTokenResData {
    token: string;
}