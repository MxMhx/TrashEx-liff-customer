// src/api/strapi/shopApi.ts
import { Shop } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

export const getAllShops = async (token: string): Promise<Shop[]> => {
    if (!token) {
        throw new Error('No token provided. User must be authenticated.');
    }
    try {
        // const API_URL = 'https://cookbstaging.careervio.com/api/shops/?populate=image
        const url = `${API_URL}/api/shops?pagination[limit]=1000&populate=image`;
        // console.log('url', url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching shops:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);
        // Map the response data to an array of Shop objects
        const shops: Shop[] = data.data.map((item: any) => ({
            id: item.id,
            name: item.attributes.name,
            location: item.attributes.location,
            latitude: item.attributes.latitude,
            longitude: item.attributes.longitude,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            bookBankNumber: item.attributes.bookBankNumber,
            bookBankImage: item.attributes.image,
            image: item.attributes.image,
            
        }));
        console.log('shops', shops);
        return shops;
    } catch (error) {
        console.error('Error fetching shops:', error.message);
        throw error;
    }
};

export const getShopById = async (id: string, token: string): Promise<Shop> => {
    if (!token) {
        throw new Error('No token provided. User must be authenticated.');
    }
    if (!id) {
        throw new Error('No shop ID provided.');
    }

    try {
        // const url = `${API_URL}/api/shops/${id}?populate=image`;
        const url = `${API_URL}/api/shops/${id}?populate[image]=true&populate[user]=true&populate[bank]=true`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching shop:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);
        const shop: Shop = {
            id: data.data.id,
            name: data.data.attributes.name,
            location: data.data.attributes.location,
            latitude: data.data.attributes.latitude,
            longitude: data.data.attributes.longitude,
            createdAt: data.data.attributes.createdAt,
            updatedAt: data.data.attributes.updatedAt,
            publishedAt: data.data.attributes.publishedAt,
            image: data.data.attributes.image,
            bookBankNumber: data.data.attributes.bookBankNumber,
            bookBankImage: data.data.attributes.image,
            user: {
                id: data.data.attributes.user.data.id,
                username: data.data.attributes.user.data.attributes.username,
                email: data.data.attributes.user.data.attributes.email,
                fullName: data.data.attributes.user.data.attributes.fullName,
            },
            bankName: data.data.attributes.bank.data.attributes.name,

        };

        console.log('shop', shop);
        return shop;
    } catch (error) {
        console.error('Error fetching shop by ID:', error.message);
        throw error;
    }
};

export const createShop = async (token: string, shopData: Record<string, any>) => {
    try {
        const url = `${API_URL}/api/shops`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: shopData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating shop:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating shop:', error.message);
        throw error;
    }
};

export const updateShop = async (token: string, shopId: number, shopData: Record<string, any>) => {
    try {
        const url = `${API_URL}/api/shops/${shopId}`;

        const response = await fetch(url, {
            method: 'PUT',  // Use 'PATCH' if you only want to update certain fields
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: shopData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error updating shop:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating shop:', error.message);
        throw error;
    }
};

export const getShopsWithProducts = async (token: string): Promise<Shop[]> => {
    if (!token) {
        throw new Error('No token provided. User must be authenticated.');
    }
    try {
        // Fetch shops with their products populated
        const url = `${API_URL}/api/shops?pagination[limit]=1000&populate[image]=true&populate[products]=true`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching shops with products:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('shops with products data', data);
        
        // Map and filter shops that have products
        const shopsWithProducts: Shop[] = data.data
            .filter((item: any) => item.attributes.products && item.attributes.products.data && item.attributes.products.data.length > 0)
            .map((item: any) => ({
                id: item.id,
                name: item.attributes.name,
                location: item.attributes.location,
                latitude: item.attributes.latitude,
                longitude: item.attributes.longitude,
                createdAt: item.attributes.createdAt,
                updatedAt: item.attributes.updatedAt,
                publishedAt: item.attributes.publishedAt,
                bookBankNumber: item.attributes.bookBankNumber,
                bookBankImage: item.attributes.image,
                image: item.attributes.image,
            }));
        
        console.log('filtered shops with products', shopsWithProducts);
        return shopsWithProducts;
    } catch (error) {
        console.error('Error fetching shops with products:', error.message);
        throw error;
    }
};
