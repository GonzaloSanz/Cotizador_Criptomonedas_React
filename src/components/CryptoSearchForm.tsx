import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../stores/store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

const CriptoSearchForm = () => {
    const { cryptoCurrencies, fetchData } = useCryptoStore();

    const [pair, setPair] = useState<Pair>({
        currency: '', 
        cryptocurrency: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setError('');

        // COnsultar la API
        fetchData(pair);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {error && <ErrorMessage msg={error} />}
            <div className="field">
                <label htmlFor="currency">Moneda</label>
                <select
                    id="currency"
                    name="currency"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccionar --</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda</label>
                <select
                    id="cryptocurrency"
                    name="cryptocurrency"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccionar --</option>
                    {cryptoCurrencies.map(cryptoCurrency => (
                        <option key={cryptoCurrency.CoinInfo.Name} value={cryptoCurrency.CoinInfo.Name}>{cryptoCurrency.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <input 
                type="submit"
                value="Cotizar"
            />
        </form>
    )
}

export default CriptoSearchForm;