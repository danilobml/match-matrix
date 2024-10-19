'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Typography, Switch, Popconfirm, Modal, message } from 'antd';

import type { TransformedData, RAFormValues } from '../types/smorgasboard.types';
import { RASmorgasboardOptions } from '../utils/constants';
import { getCleanData, getTransformedSavedToRAFormValues } from '../utils/utils';
import RadarChartComponent from './RadarChartComponent';
import TableChartComponent from './TableChartComponent';

const { Title } = Typography;
const { Option } = Select;

const RAForm: React.FC = () => {
    const [chartData, setChartData] = useState<TransformedData[]>([]);
    const [isSpecificRelationship, setIsSpecificRelationship] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showSave, setShowSave] = useState<boolean>(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [generateButtonText, setGenerateButtonText] = useState<string>('Generate Map');
    const [generatePopVisible, setGeneratePopVisible] = useState<boolean>(false);
    const [savePopVisible, setSavePopVisible] = useState<boolean>(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [shareUserId, setShareUserId] = useState<number | null>(null);
    const [hasSavedData, setHasSavedData] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSharing, setIsSharing] = useState<boolean>(false);

    const [form] = Form.useForm();

    const handleToggleChange = (checked: boolean) => {
        setIsSpecificRelationship(checked);
    };

    useEffect(() => {
        const user = sessionStorage.getItem('RAS_USER');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser?.raSmorgasboardId) {
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`/api/raSmorgasboard?userId=${parsedUser.userId}`);
                            const result = await response.json();
                            if (result.data) {
                                form.setFieldsValue(getTransformedSavedToRAFormValues(result.data));
                                setHasSavedData(true);
                                setShowSave(true);
                            }
                        } catch (error) {
                            console.error('Failed to fetch preferences:', error);
                        } finally {
                            setLoading(false);
                        }
                    };
                    fetchData();
                } else {
                    setLoading(false);
                }
            } catch (e) {
                console.error('Failed to parse user session data:', e);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [form]);

    const getMissingFields = (values: RAFormValues) => {
        const missing: string[] = [];
        Object.entries(values).forEach(([section, items]) => {
            if (typeof items === 'object' && items !== null) {
                Object.entries(items).forEach(([item, value]) => {
                    if (value === undefined) {
                        missing.push(`${section.replace(/([A-Z])/g, ' $1')} - ${item}`);
                    }
                });
            }
        });
        return missing;
    };

    const handleGenerateMap = () => {
        form
            .validateFields()
            .then((values) => {
                const missing = getMissingFields(values);
                setMissingFields(missing);
                const allFieldsEmpty = Object.values(values).every(
                    (field) => field === undefined || field === null || field === '' || (typeof field === 'object' && Object.values(field).every(value => value === null || value === undefined))
                );

                if (allFieldsEmpty) {
                    message.error('No data to chart!');
                    return;
                }
                if (missing.length > 0) {
                    setGeneratePopVisible(true);
                } else {
                    generateCharts(values);
                    setShowSave(true);
                }
            })
            .catch((info) => console.error('Validation Failed:', info));
    };

    const handleSave = async () => {
        setIsSaving(true);
        form.validateFields().then(async (values) => {
            const user = sessionStorage.getItem('RAS_USER');
            if (!user) {
                console.error('No user data available in session storage');
                setIsSaving(false);
                return;
            }

            const parsedUser = JSON.parse(user);
            const { userId } = parsedUser;

            if (userId) {
                const cleanData = getCleanData(values);

                const payload = {
                    userId,
                    data: cleanData,
                    relationshipWithName: isSpecificRelationship ? values.relationshipWithName : 'Everyone',
                    relationshipWithId: isSpecificRelationship ? values.relationshipWithId || null : null,
                };

                try {
                    const response = await fetch('/api/raSmorgasboard', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to save RA Smorgasboard data');
                    }
                    const responseData = await response.json()
                    const user = sessionStorage.getItem('RAS_USER');
                    const parsedUser = JSON.parse(user!);
                    const updatedUser = { ...parsedUser, raSmorgasboardId: responseData.newRaSmorgasboardId }
                    console.log(updatedUser)
                    sessionStorage.setItem('RAS_USER', JSON.stringify(updatedUser))
                    setHasSavedData(true);
                    message.success('RA Smorgasboard data saved successfully!');
                } catch (error) {
                    console.error('Failed to save RA Smorgasboard data:', error);
                    message.error('Failed to save RA Smorgasboard data.')
                } finally {
                    setIsSaving(false);
                }
            }
        });
    };

    const generateCharts = (values: RAFormValues) => {
        const transformedData: TransformedData[] = [];
        Object.entries(values).forEach(([section, items]) => {
            if (typeof items === 'object' && items !== null) {
                Object.entries(items).forEach(([item, value]) => {
                    transformedData.push({
                        x: section,
                        y: item,
                        value,
                    });
                });
            }
        });
        setChartData(transformedData);
        setGenerateButtonText('Regenerate Map');
        setShowSave(true);
    };

    const handleSaveClick = () => {
        form
            .validateFields()
            .then((values) => {
                const missing = getMissingFields(values);
                setMissingFields(missing);
                if (missing.length > 0) {
                    setSavePopVisible(true);
                } else {
                    handleSave();
                }
            })
            .catch((info) => console.error('Validation Failed:', info));
    };

    const confirmSave = () => {
        handleSave();
        setSavePopVisible(false);
    };

    const confirmGenerate = () => {
        const values = form.getFieldsValue();
        generateCharts(values);
        setGeneratePopVisible(false);
        setShowSave(true);
    };

    const handleShareData = () => {
        setIsShareModalVisible(true);
    };

    const handleShareSubmit = async () => {
        setIsSharing(true);
        const user = sessionStorage.getItem('RAS_USER');
        const parsedUser = JSON.parse(user!);

        if (!shareUserId) {
            setIsSharing(false);
            return;
        }

        if (shareUserId == parsedUser.userId) {
            message.error('You are trying to share with your own user id!')
            setIsSharing(false);
            return
        }

        try {
            const response = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ raSmorgasboardId: parsedUser.raSmorgasboardId, userId: parsedUser.userId, sharedWithUserId: Number(shareUserId) }),
            });

            if (response.ok) {
                message.success('You have successfully shared your data, contact your partner to tell them and ask them to share theirs, so you both can visualize it!');
            } else if (response.status === 404) {
                message.error('User with the given Id not found.')
            } else {
                message.error('Failed to share data.');
            }
        } catch {
            message.error('An error occurred.');
        } finally {
            setIsSharing(false);
            setIsShareModalVisible(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '10px 60px' }}>
            <Form form={form} layout="vertical">
                <Title level={2} style={{ fontSize: '30px', marginBottom: '40px' }}>Relationship Anarchy Smorgasboard</Title>

                <Form.Item label={<span style={{ fontSize: '16px' }}>For a specific relationship?</span>}>
                    <Switch checked={isSpecificRelationship} onChange={handleToggleChange} />
                </Form.Item>

                <Form.Item
                    name="relationshipWithName"
                    label={<span style={{ fontSize: '16px' }}>Relationship With: Name</span>}
                    rules={[{ required: isSpecificRelationship, message: 'Please provide a relationship name if specific.' }]}
                    style={{ width: '300px' }}
                >
                    <Input disabled={!isSpecificRelationship} />
                </Form.Item>

                <Form.Item
                    name="relationshipWithId"
                    label={<span style={{ fontSize: '16px' }}>Relationship With: Id</span>}
                    style={{ width: '300px', marginBottom: '60px' }}
                >
                    <Input disabled={!isSpecificRelationship} />
                </Form.Item>

                {Object.entries(RASmorgasboardOptions).map(([section, items]) => (
                    <Form.Item key={section} label={<span style={{ fontSize: '17px' }}>{section.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>}>
                        {items.map(item => (
                            <Form.Item
                                key={item}
                                name={[section, item]}
                                label={item === 'attend_to_one_another’s_love_languages' ? (
                                    <span style={{ whiteSpace: 'nowrap', fontSize: '16px' }}>Attend to one another’s love languages</span>
                                ) : <span style={{ fontSize: '15px' }}>{item}</span>}
                                style={{ display: 'inline-block', width: '200px', marginRight: '8px' }}
                            >
                                <Select size="small">
                                    <Option value={0}>0 - No: Deal-breaker</Option>
                                    <Option value={1}>1 - Not important</Option>
                                    <Option value={2}>2 - Somewhat important</Option>
                                    <Option value={3}>3 - Important</Option>
                                    <Option value={4}>4 - Very important</Option>
                                    <Option value={5}>5 - Must-have</Option>
                                </Select>
                            </Form.Item>
                        ))}
                    </Form.Item>
                ))}

                <Popconfirm
                    title={
                        <>
                            <p>Not all fields were selected:</p>
                            {missingFields.map((field, idx) => (
                                <p key={idx} style={{ color: 'red' }}>{field}</p>
                            ))}
                            <p>Proceed anyway?</p>
                        </>
                    }
                    visible={generatePopVisible}
                    onConfirm={confirmGenerate}
                    onCancel={() => setGeneratePopVisible(false)}
                >
                    <Button type="primary" onClick={handleGenerateMap}>
                        {generateButtonText}
                    </Button>
                </Popconfirm>

                {showSave && (
                    <Popconfirm
                        title={
                            <>
                                <p>Not all fields were selected:</p>
                                {missingFields.map((field, idx) => (
                                    <p key={idx} style={{ color: 'red' }}>{field}</p>
                                ))}
                                <p>Proceed anyway?</p>
                            </>
                        }
                        visible={savePopVisible}
                        onConfirm={confirmSave}
                        onCancel={() => setSavePopVisible(false)}
                    >
                        <Button type="primary" onClick={handleSaveClick} loading={isSaving} style={{ marginLeft: '10px' }}>
                            {hasSavedData ? 'Update Data' : 'Save Data'}
                        </Button>
                    </Popconfirm>
                )}

                {hasSavedData && (
                    <Button type="primary" onClick={handleShareData} loading={isSharing} style={{ marginLeft: '10px' }}>
                        Share your data?
                    </Button>
                )}

                <Modal title="Share your data" visible={isShareModalVisible} onOk={handleShareSubmit} onCancel={() => setIsShareModalVisible(false)}>
                    <Input value={shareUserId || ''} onChange={(e) => setShareUserId(Number(e.target.value))} placeholder="Insert User ID" />
                </Modal>
            </Form>

            {chartData.length > 0 && <TableChartComponent chartData={chartData} />}
            {chartData.length > 0 && <RadarChartComponent chartData={chartData} />}
        </div>
    );
};

export default RAForm;
