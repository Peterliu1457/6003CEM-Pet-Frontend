

import React from 'react';
import { Card, Button } from 'antd';
import { IDog } from '../type/Dog';

interface DogCardProps {
    dog: IDog;
    onEdit: () => void;
    onRemove: () => void;
}

export const DogCard: React.FC<DogCardProps> = ({ dog, onEdit, onRemove }) => {
    return (
        <Card
            hoverable
            style={{ width: 240, margin: '16px' }}
            cover={<img alt="dog" src={dog.photos[0]} />}
            actions={[
                <Button key="edit" onClick={onEdit}>Edit</Button>,
                <Button key="remove" type="primary" danger onClick={onRemove}>Remove</Button>
            ]}
        >
            <Card.Meta title={dog.name} description={`Created at: ${new Date(dog.createdAt!).toLocaleDateString()}`} />
        </Card>
    );
};
