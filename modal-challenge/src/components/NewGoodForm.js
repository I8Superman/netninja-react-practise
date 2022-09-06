import { useState } from 'react';
import './NewGoodForm.css';

export default function NewGoodForm({ addGood }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('København');

    const resetForm = () => {
        setTitle('');
        setDate('');
        setPrice('');
        setLocation('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGood = {
            title: title,
            date: date,
            location: location,
            price: price,
            id: Math.floor(Math.random() * 10000)
        }
        addGood(newGood)
        resetForm();
    }

    console.log('NewGoodForm rendered')
    return (
        <form className="new-good-form" onSubmit={handleSubmit}>
            <label>
                <span>Good title</span>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
            </label>
            <label>
                <span>Date added</span>
                <input type="date" onChange={e => setDate(e.target.value)} value={date} />
            </label>
            <label>
                <span>Price</span>
                <input type="text" onChange={e => setPrice(e.target.value)} value={price} />
            </label>
            <label>
                <span>Good location</span>
                <select onChange={(e) => setLocation(e.target.value)}>
                    <option value="Odense">Odense</option>
                    <option value="Aalborg">Aalborg</option>
                    <option value="Århus">Århus</option>
                    <option value="Bogense">Bogense</option>
                </select>
            </label>

            <p>Your good so far:</p>
            <p>{title}, {date}, {price} €</p>
            <p onClick={resetForm}>Reset form</p>
            <button>SUBMIT</button>
        </form>)
}
