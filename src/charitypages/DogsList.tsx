

import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, message, Empty, Button } from 'antd';
import { IDog } from '../type/Dog';
import { DogCard } from '../components/DogCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DogsList: React.FC = () => {
    const router = useNavigate();
    const [dogs, setDogs] = useState<IDog[]>([]);

    useEffect(() => {
        axios.get('/api/dogs/own')
        .then((response) => {
            setDogs(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleEdit = (dogId: string) => {
        router(`/charity/dogs/${dogId}`);
    };

    const handleRemove = (dogId: string) => {
        Modal.confirm({
            title: 'Are you sure you want to remove this dog?',
            onOk: async () => {
                try {
                    await axios.delete(`/api/dogs/${dogId}`);
                    setDogs((prevDogs) => prevDogs.filter((dog) => dog._id !== dogId));
                    message.success('Dog removed successfully');
                } catch (err) {
                    console.log(err);
                }
            },
        });
    };

    return (
        <div>
            <Button onClick={() => router('/charity/upload-dog')}>Upload Dog</Button>
            <Row gutter={[16, 16]}>
                {dogs.map((dog, index) => (
                    <Col key={index} span={8}>
                        <DogCard
                            dog={dog}
                            onEdit={() => handleEdit(dog._id!)}
                            onRemove={() => handleRemove(dog._id!)}
                        />
                    </Col>
                ))}
            </Row>
            {dogs.length === 0 && <Empty />}
        </div>
    );
};
