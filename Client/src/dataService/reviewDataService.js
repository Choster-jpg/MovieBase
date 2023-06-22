import {$host} from "./index.js";

export const createReview = async (review, setError) => {
    try {
        console.log(review);
        const { data } = await $host.post(`api/review`, review);
        return data;
    }
    catch (e) {
        setError(e.message);
        console.log(e);
    }
}

//export const isReviewExists = async (user_id, movie_id)