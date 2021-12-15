import axios from "axios";
import { User } from "../types/User";

/**
 * User取得API
 * @returns User
 */
export const getUser = async () => {
    const { data } = await axios.get<User>("api/user");
    return data;
};

/**
 * ログイン処理API
 * @returns Task
 */
export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const { data } = await axios.post<User>(`api/login`, { email, password });
    return data;
};

/**
 * ログインアウト処理API
 * @returns Task
 */
export const logout = async () => {
    const { data } = await axios.post<User>(`api/logout`);
    return data;
};
