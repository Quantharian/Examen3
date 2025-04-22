import { describe, it, expect, vi } from 'vitest';
import { ApiRepo } from '../../services/api.repo';
import { Product } from '../../types/product';

describe('ApiRepo', () => {
    const apiRepo = new ApiRepo();
    const mockFetch = vi.fn();

    beforeEach(() => {
        global.fetch = mockFetch;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch products successfully', async () => {
        const mockProducts: Product[] = [
            { id: 1, name: 'Test Product', price: 100 },
        ];
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        });

        const products = await apiRepo.getProducts();
        expect(products).toEqual(mockProducts);
        expect(mockFetch).toHaveBeenCalledWith(apiRepo.apiUrl);
    });

    it('should throw an error when fetching products fails', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        await expect(apiRepo.getProducts()).rejects.toThrow('404 Not Found');
    });

    it('should create a product successfully', async () => {
        const newProduct: Partial<Product> = {
            name: 'New Product',
            price: 200,
        };
        const createdProduct: Product = {
            id: 2,
            name: 'New Product',
            price: 200,
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => createdProduct,
        });

        const result = await apiRepo.createProduct(newProduct);
        expect(result).toEqual(createdProduct);
        expect(mockFetch).toHaveBeenCalledWith(apiRepo.apiUrl, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    it('should throw an error when creating a product fails', async () => {
        const newProduct: Partial<Product> = {
            name: 'New Product',
            price: 200,
        };

        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        });

        await expect(apiRepo.createProduct(newProduct)).rejects.toThrow(
            '400 Bad Request',
        );
    });

    it('should update a product successfully', async () => {
        const updatedProduct: Partial<Product> = { price: 150 };
        const resultProduct: Product = {
            id: 1,
            name: 'Updated Product',
            price: 150,
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => resultProduct,
        });

        const result = await apiRepo.updateProduct(1, updatedProduct);
        expect(result).toEqual(resultProduct);
        expect(mockFetch).toHaveBeenCalledWith(`${apiRepo.apiUrl}/1`, {
            method: 'PATCH',
            body: JSON.stringify(updatedProduct),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    it('should throw an error when updating a product fails', async () => {
        const updatedProduct: Partial<Product> = { price: 150 };

        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        await expect(apiRepo.updateProduct(1, updatedProduct)).rejects.toThrow(
            '404 Not Found',
        );
    });

    it('should delete a product successfully', async () => {
        const mockProducts: Product[] = [
            { id: 2, name: 'Remaining Product', price: 300 },
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        });

        const result = await apiRepo.deleteProduct(1);
        expect(result).toEqual(mockProducts);
        expect(mockFetch).toHaveBeenCalledWith(`${apiRepo.apiUrl}/1`, {
            method: 'DELETE',
        });
    });

    it('should throw an error when deleting a product fails', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        });

        await expect(apiRepo.deleteProduct(1)).rejects.toThrow(
            '500 Internal Server Error',
        );
    });
});
