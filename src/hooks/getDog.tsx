import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDog } from '../type/Dog';

const useGetDog = (dogId: string) => {
    const [dog, setDog] = useState<IDog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const response = await axios.get(`/api/dogs/${dogId}`);
                setDog(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch dog');
                setLoading(false);
            }
        };

        fetchDog();
    }, [dogId]);

    return { dog, loading, error };
};

export default useGetDog;