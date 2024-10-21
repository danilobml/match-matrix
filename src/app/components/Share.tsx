'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Checkbox, Button, Popconfirm, message, Typography, Card } from 'antd';
import { useShareData } from '../hooks/useShareData';
import { getParsedSessionUser } from '../utils/manageSessionUser';

const { Title } = Typography;

const Share = () => {
    const [isRAFormChecked, setIsRAFormChecked] = useState(false);
    const [shareUserId, setShareUserId] = useState<string>('');
    const [hasSmorgasboard, setHasSmorgasboard] = useState(false);

    const router = useRouter();

    const { shareData, isLoading } = useShareData();

    useEffect(() => {
        const parsedUser = getParsedSessionUser();
        if (parsedUser) {
            setHasSmorgasboard(!!parsedUser.raSmorgasboardId);
        }
    }, []);

    const handleShare = async () => {
        const shareUserIdNumber = Number(shareUserId);
        if (isNaN(shareUserIdNumber)) {
            message.error('Invalid user ID. Please enter a valid number.');
            return;
        }
        shareData(shareUserIdNumber);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', paddingTop: 0 }}>
            <Card className="share-card" style={{ width: '370px' }}>
                <Title level={2}>Share your Data!</Title>

                {hasSmorgasboard ? (
                    <>
                        <Checkbox checked={isRAFormChecked} onChange={() => setIsRAFormChecked(!isRAFormChecked)} style={{ marginBottom: '16px' }}>
                            R A Smorgasboard
                        </Checkbox>

                        {isRAFormChecked && (
                            <Form layout="vertical" style={{ marginBottom: '16px' }}>
                                <Form.Item label="Insert ID of the user">
                                    <Input value={shareUserId} onChange={(e) => setShareUserId(e.target.value)} />
                                </Form.Item>
                                <Popconfirm title="Are you sure you want to share your data?" onConfirm={handleShare}>
                                    <Button type="primary" style={{ width: '100%', marginBottom: '16px' }} loading={isLoading}>
                                        Share
                                    </Button>
                                </Popconfirm>
                            </Form>
                        )}
                    </>
                ) : (<p style={{ marginBottom: '20px' }}>&quot;You haven&apos;t filled and saved a form yet. You can share once you did!&quot;</p>)}

                <Button
                    onClick={() => {
                        const parsedUser = getParsedSessionUser();
                        if (parsedUser) {
                            message.info(`Your user ID is ${parsedUser.userId}`);
                        } else {
                            message.error('User ID not found in session');
                        }
                    }}
                    style={{ width: '100%', marginBottom: '16px' }}
                >
                    Get your user ID to share!
                </Button>

                <Button onClick={() => router.push('/home')} style={{ width: '100%' }}>
                    Home
                </Button>
            </Card>
        </div>
    );
};

export default Share;
