'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Checkbox, Button, Popconfirm, message, Typography, Card } from 'antd';

const { Title } = Typography;

const Share = () => {
    const [isRAFormChecked, setIsRAFormChecked] = useState(false);
    const [shareUserId, setShareUserId] = useState<string>('');
    const [hasSmorgasboard, setHasSmorgasboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('RAS_USER');
        if (user) {
            const parsedUser = JSON.parse(user);
            setHasSmorgasboard(parsedUser.hasRaSmorgasboard);
        }
    }, []);

    const handleShare = async () => {
        setLoading(true);
        try {
            const user = sessionStorage.getItem('RAS_USER');
            if (!user) {
                message.error('User ID not found in session');
                setLoading(false);
                return;
            }
            const parsedUser = JSON.parse(user);

            const response = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ raSmorgasboardId: parsedUser.raSmorgasboardId, userId: shareUserId }),
            });

            if (response.ok) {
                message.success('You have successfully shared your data, contact your partner to tell them and ask them to share theirs, so you both can visualize it!');
            } else {
                message.error('Failed to share.');
            }
        } catch {
            message.error('Error occurred.');
        } finally {
            setLoading(false);
        }
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
                                    <Button type="primary" style={{ width: '100%', marginBottom: '16px' }} loading={loading}>
                                        Share
                                    </Button>
                                </Popconfirm>
                            </Form>
                        )}
                    </>
                ) : (<p style={{ marginBottom: '20px'}}>&quot;You havent filled a form yet. You can share once you did!&quot;</p>)}

                <Button
                    onClick={() => {
                        const user = sessionStorage.getItem('RAS_USER');
                        if (user) {
                            const parsedUser = JSON.parse(user);
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
