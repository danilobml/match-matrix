import { useState } from 'react';
import { message } from 'antd';
import { getParsedSessionUser } from '../utils/manageSessionUser';

export const useShareData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const shareData = async (shareUserId: string | number) => {
        setIsLoading(true);

        const parsedUser = getParsedSessionUser();
        
        if (!shareUserId) {
            setIsLoading(false);
            return;
        }

        if (shareUserId === parsedUser!.userId) {
            message.error('You are trying to share with your own user id!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    raSmorgasboardId: parsedUser!.raSmorgasboardId,
                    userId: parsedUser!.userId,
                    sharedWithUserId: Number(shareUserId)
                }),
            });

            if (response.ok) {
                message.success('You have successfully shared your data, contact your partner to tell them and ask them to share theirs, so you both can visualize it!');
            } else if (response.status === 404) {
                message.error('User with the given Id not found.');
            } else {
                message.error('Failed to share data.');
            }
        } catch {
            message.error('An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return { shareData, isLoading };
};
