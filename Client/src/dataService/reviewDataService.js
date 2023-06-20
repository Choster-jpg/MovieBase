import {$host} from "./index.js";

export const createReview = async (review) => {
    try {
        console.log(review);
        const { data } = await $host.post(`api/review`, review);
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

//export const isReviewExists = async (user_id, movie_id)