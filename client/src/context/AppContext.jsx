import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {



    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL
    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });

            console.log('isAdmin response:', data);

            // 👉 TẠM BỎ QUA KIỂM TRA Ở LOCAL DEV
            const forceBypass = import.meta.env.DEV; // hoặc true nếu bạn chắc chắn

            if (forceBypass) {
                setIsAdmin(true);
                return;
            }

            setIsAdmin(data.isAdmin);

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/');
                toast.error('You are not authorized to access admin dashboard');
            }

        } catch (error) {
            console.error('Error fetching admin status:', error);

            // 👉 fallback nếu lỗi thì cũng bypass (tạm thôi)
            setIsAdmin(true);
        }
    }


    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all')
            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching shows:', error);
        }
    }

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            if (data.success) {
                setFavoriteMovies(data.movies)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        fetchShows();
    }, [])
    useEffect(() => {
        if (user) {
            fetchIsAdmin();
            fetchFavoriteMovies();
        }
    }, [user])
    const value = {
        axios,
        fetchIsAdmin,
        isAdmin,
        shows,
        user, getToken, navigate, favoriteMovies, fetchFavoriteMovies, image_base_url
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);