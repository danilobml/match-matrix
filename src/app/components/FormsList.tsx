
'use client'

import { Typography, Button } from "antd"
import { useRouter } from 'next/navigation';

import { listOfForms, type ListOfFormsItem } from "../utils/constants"

const { Title } = Typography

const FormsList: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Title level={3}>Available forms:</Title>
            {listOfForms.map((form: ListOfFormsItem, index: number) => {
                return (
                    <Button key={`button-${index}`} type="primary" onClick={() => router.push(`/${form.nameRef}`)}>
                        {form.title}
                    </Button>
                )
            })}
        </>
    )
}

export default FormsList