import axios from 'axios';

export const getOneHero = async (id) => {
    try {
        const response = await axios.get('https://www.superheroapi.com/api.php/24096205769966502/' + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};