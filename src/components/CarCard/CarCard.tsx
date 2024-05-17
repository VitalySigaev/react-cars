import { FC, useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { Car } from '../../types/type';
import cls from './CarCard.module.css'
import CarMap from '../CarMap/CarMap';

interface CarCardProps {
    carData: Car;
    deleteCard: (id: number) => void;
    updateCard: (updatedCar: Car) => void;
}

const CarCard: FC<CarCardProps> = ({ carData, deleteCard, updateCard }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedCarData, setEditedCarData] = useState<Car>(carData);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCarData({ ...editedCarData, [name]: value });
    };

    const handleSave = () => {
        updateCard(editedCarData);
        setIsEditing(false);
    };

    return (
        <Card className={cls.card}>
            <CardContent>
                {isEditing ? (
                    <>
                        <TextField
                            label="Name"
                            name="name"
                            value={editedCarData.name}
                            onChange={handleChange}
                            fullWidth
                            className={cls.textField}
                        />
                        <TextField
                            label="Model"
                            name="model"
                            value={editedCarData.model}
                            onChange={handleChange}
                            fullWidth
                            className={cls.textField}
                        />
                        <TextField
                            label="Year"
                            name="year"
                            value={editedCarData.year}
                            onChange={handleChange}
                            fullWidth
                            className={cls.textField}
                        />
                        <TextField
                            label="Color"
                            name="color"
                            value={editedCarData.color}
                            onChange={handleChange}
                            fullWidth
                            className={cls.textField}
                        />
                        <TextField
                            label="Price"
                            name="price"
                            value={editedCarData.price}
                            onChange={handleChange}
                            fullWidth
                            className={cls.textField}
                        />
                        <Button onClick={handleSave}>Сохранить</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">
                            {carData.name} {carData.model}
                        </Typography>
                        <Typography variant="h5">
                            {carData.year}, {carData.color}
                        </Typography>
                        <Typography variant="h5">
                            {carData.price}
                        </Typography>
                        <Button onClick={handleEditToggle}>Редактировать</Button>
                        <CarMap car={carData} />
                    </>
                )}
                <Button onClick={() => deleteCard(carData.id)}>Удалить</Button>

            </CardContent>
        </Card>
    );
};

export default CarCard;
