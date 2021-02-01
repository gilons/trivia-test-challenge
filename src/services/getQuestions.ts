import { client } from '../api/client';

const URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

export const getQuestion = async (): Promise<any> => {
    try {
        const response = await client.get(URL)
        return response.results
    } catch (err) {
        return Promise.reject(err)
    }
}