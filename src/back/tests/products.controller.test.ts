/* eslint-disable @typescript-eslint/no-explicit-any */
// filepath: src/back/tests/products.controller.test.ts
import { describe, it, expect, vi } from 'vitest';
import { ProductsController } from '../products.controller';
import { ProductRepo } from '../../repo/products.repository';

describe('ProductsController', () => {
    const mockRepo = {
        read: vi.fn(),
        readById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    } as unknown as ProductRepo;

    const controller = new ProductsController(mockRepo);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should handle errors in getAll', async () => {
        const mockError = new Error('Error fetching products');
        mockRepo.read.mockRejectedValue(mockError);
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.getAll({} as any, mockRes, mockNext);

        expect(mockRepo.read).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should handle errors in getById', async () => {
        const mockError = new Error('Error fetching product by ID');
        mockRepo.readById.mockRejectedValue(mockError);
        const mockReq = { params: { id: '1' } } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.getById(mockReq, mockRes, mockNext);

        expect(mockRepo.readById).toHaveBeenCalledWith('1');
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should handle errors in create', async () => {
        const mockError = new Error('Error creating product');
        mockRepo.create.mockRejectedValue(mockError);
        const mockReq = { body: { name: 'New Product' } } as any;
        const mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;
        const mockNext = vi.fn();

        await controller.create(mockReq, mockRes, mockNext);

        expect(mockRepo.create).toHaveBeenCalledWith({ name: 'New Product' });
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should handle errors in update', async () => {
        const mockError = new Error('Error updating product');
        mockRepo.update.mockRejectedValue(mockError);
        const mockReq = {
            params: { id: '1' },
            body: { name: 'Updated Product' },
        } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.update(mockReq, mockRes, mockNext);

        expect(mockRepo.update).toHaveBeenCalledWith('1', {
            name: 'Updated Product',
        });
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should handle errors in delete', async () => {
        const mockError = new Error('Error deleting product');
        mockRepo.delete.mockRejectedValue(mockError);
        const mockReq = { params: { id: '1' } } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.delete(mockReq, mockRes, mockNext);

        expect(mockRepo.delete).toHaveBeenCalledWith('1');
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    // Add similar tests for getById, create, update, and delete
    // filepath: src/back/tests/products.controller.test.ts

    it('should get all products', async () => {
        mockRepo.read.mockResolvedValue([]);
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.getAll({} as any, mockRes, mockNext);

        expect(mockRepo.read).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith({ results: [], error: '' });
    });

    it('should get a product by ID', async () => {
        const mockProduct = { id: '1', name: 'Test Product' };
        mockRepo.readById.mockResolvedValue(mockProduct);
        const mockReq = { params: { id: '1' } } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.getById(mockReq, mockRes, mockNext);

        expect(mockRepo.readById).toHaveBeenCalledWith('1');
        expect(mockRes.json).toHaveBeenCalledWith({
            results: [mockProduct],
            error: '',
        });
    });

    it('should create a new product', async () => {
        const mockProduct = { id: '1', name: 'New Product' };
        mockRepo.create.mockResolvedValue(mockProduct);
        const mockReq = { body: { name: 'New Product' } } as any;
        const mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;
        const mockNext = vi.fn();

        await controller.create(mockReq, mockRes, mockNext);

        expect(mockRepo.create).toHaveBeenCalledWith({ name: 'New Product' });
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            results: [mockProduct],
            error: '',
        });
    });

    it('should update a product', async () => {
        const mockProduct = { id: '1', name: 'Updated Product' };
        mockRepo.update.mockResolvedValue(mockProduct);
        const mockReq = {
            params: { id: '1' },
            body: { name: 'Updated Product' },
        } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.update(mockReq, mockRes, mockNext);

        expect(mockRepo.update).toHaveBeenCalledWith('1', {
            name: 'Updated Product',
        });
        expect(mockRes.json).toHaveBeenCalledWith({
            results: [mockProduct],
            error: '',
        });
    });

    it('should delete a product', async () => {
        const mockProduct = { id: '1', name: 'Deleted Product' };
        mockRepo.delete.mockResolvedValue(mockProduct);
        const mockReq = { params: { id: '1' } } as any;
        const mockRes = { json: vi.fn() } as any;
        const mockNext = vi.fn();

        await controller.delete(mockReq, mockRes, mockNext);

        expect(mockRepo.delete).toHaveBeenCalledWith('1');
        expect(mockRes.json).toHaveBeenCalledWith({
            results: [mockProduct],
            error: '',
        });
    });
});
