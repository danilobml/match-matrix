import type { User } from "../types/user.types";

type DataToUpdate = {
    [key: string]: string | number | null;
};

export const getParsedSessionUser = (): User | null => {
    const user = sessionStorage.getItem('RAS_USER');
    if (!user) {
        return null
    }
    const parsedUser = JSON.parse(user);
    return parsedUser
}

export const updateSessionUser = (dataToUpdate: DataToUpdate): void => {
    const user = getParsedSessionUser();
    const updatedUser = { ...user, ...dataToUpdate }
    sessionStorage.setItem('RAS_USER', JSON.stringify(updatedUser));
}