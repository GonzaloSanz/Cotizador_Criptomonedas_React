import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema";
import { Pair } from "../types";

export const getCryptos = async () => {
    // API https://min-api.cryptocompare.com/
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;

    const { data: { Data } } = await axios(url);

    // Validar respuesta con Zod
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);

    if (result.success) {
        return result.data;
    }
}

export const fetchCurrentCryptoPrice = async (pair: Pair) => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`;

    const { data: { DISPLAY } } = await axios(url);

    // Validar respuesta con Zod
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency]);

    if (result.success) {
        return result.data;
    }
}