import { FC } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SortSelectProps {
    value: 'year-asc' | 'year-desc' | 'price-asc' | 'price-desc';
    onChange: (value: 'year-asc' | 'year-desc' | 'price-asc' | 'price-desc') => void;
}

const SortSelect: FC<SortSelectProps> = ({ value, onChange }) => {
    const handleSortChange = (event: SelectChangeEvent<'year-asc' | 'year-desc' | 'price-asc' | 'price-desc'>) => {
        onChange(event.target.value as 'year-asc' | 'year-desc' | 'price-asc' | 'price-desc');
    };

    return (
        <FormControl sx={{ margin: '20px 0' }}>
            <InputLabel>Сортировка</InputLabel>
            <Select value={value} onChange={handleSortChange}>
                <MenuItem value="year-asc">По году (по возрастанию)</MenuItem>
                <MenuItem value="year-desc">По году (по убыванию)</MenuItem>
                <MenuItem value="price-asc">По стоимости (по возрастанию)</MenuItem>
                <MenuItem value="price-desc">По стоимости (по убыванию)</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortSelect;
