import axios from "axios";
const SERVER_API_ROUTE = 'http://localhost:5000/';

const $host = axios.create({
    withCredentials: true,
    baseURL: SERVER_API_ROUTE
});

const $authHost = axios.create({
    withCredentials: true,
    baseURL: SERVER_API_ROUTE
});

const authInterceptor = config =>
{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

const refreshInterceptor = async (error) =>
{
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config._isRetry)
    {
        originalRequest._isRetry = true;
        try
        {
            const response = await axios.get(`${SERVER_API_ROUTE}api/user/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            console.log('ok');
            return $authHost.request(originalRequest);
        }
        catch (e)
        {
            console.log("Not authorized");
        }
    }
    throw error;
}

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
    (config) => {
        return config;
    },
    refreshInterceptor
);


export
{
    $host,
    $authHost,
    SERVER_API_ROUTE
}