import { useEffect, useState } from 'react';
import './App.css';
import { Car } from './types/type';
import axios, { AxiosResponse } from 'axios';
import CarCard from './components/CarCard/CarCard';
import { Alert } from '@mui/material';
import Loader from './components/Loader/Loader';
import SortSelect from './components/SortSelect/SortSelect';

function App() {
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'year-asc' | 'year-desc' | 'price-asc' | 'price-desc'>('year-asc');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response: AxiosResponse<Car[]> = await axios.get('https://test.tspb.su/test-task/vehicles');
      setCarsData(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCard = (id: number) => {
    setCarsData(carsData.filter((car: Car) => car.id !== id));
  };

  const updateCard = (updatedCar: Car) => {
    setCarsData(carsData.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  const sortedCars = [...carsData].sort((a, b) => {
    switch (sortOrder) {
      case 'year-asc':
        return +a.year - +b.year;
      case 'year-desc':
        return +b.year - +a.year;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className='cardsContainer'>
      <SortSelect value={sortOrder} onChange={setSortOrder} />
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : isLoading ? (
        <Loader elements={6} />
      ) : (
        sortedCars.map((car: Car) => (
          <CarCard
            carData={car}
            key={car.id}
            deleteCard={deleteCard}
            updateCard={updateCard}
          />
        ))
      )}
    </div>
  );
}

export default App;
