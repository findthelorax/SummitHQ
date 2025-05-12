import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import AidRoomModel from '../models/aidRoomModel';

class AidRoomController {
    async createAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Check if the mountain exists
            const mountainExists = await prisma.mountain.findUnique({
                where: { id: mountainId },
            });
            if (!mountainExists) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }

            // Create the aid room
            const result = await AidRoomModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId } = req.params;

            // Validate mountainId and aidRoomId
            if (!mountainId || !aidRoomId) {
                res.status(400).json({ message: 'Mountain ID and AidRoom ID are required' });
                return;
            }

            // Check if the aid room exists
            const result = await AidRoomModel.findByIdAndMountain(aidRoomId, mountainId);
            if (!result) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAidRooms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Get all aid rooms for the mountain
            const results = await AidRoomModel.findAllByMountain(mountainId);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    async updateAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId } = req.params;
            const updatedData = req.body;

            // Validate mountainId and aidRoomId
            if (!mountainId || !aidRoomId) {
                res.status(400).json({ message: 'Mountain ID and AidRoom ID are required' });
                return;
            }

            // Check if the aid room exists
            const aidRoomExists = await AidRoomModel.findByIdAndMountain(aidRoomId, mountainId);
            if (!aidRoomExists) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }

            // Update the aid room
            const result = await AidRoomModel.updateById(aidRoomId, updatedData);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId } = req.params;

            // Validate mountainId and aidRoomId
            if (!mountainId || !aidRoomId) {
                res.status(400).json({ message: 'Mountain ID and AidRoom ID are required' });
                return;
            }

            // Check if the aid room exists
            const aidRoomExists = await AidRoomModel.findByIdAndMountain(aidRoomId, mountainId);
            if (!aidRoomExists) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }

            // Delete the aid room
            const deleted = await AidRoomModel.deleteById(aidRoomId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AidRoomController();