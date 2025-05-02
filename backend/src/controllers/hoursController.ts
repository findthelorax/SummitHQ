import { Request, Response, NextFunction } from 'express';
import HoursModel from '../models/hoursModel';

class HoursController {
    async createHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params; // Use locationId instead of mountainId
            const data = req.body;
            const hours = await HoursModel.create(locationId, data);
            res.status(201).json(hours);
        } catch (error) {
            next(error);
        }
    }

    async getHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params; // Use locationId instead of mountainId
            const hours = await HoursModel.findAllByLocation(locationId);
            res.status(200).json(hours);
        } catch (error) {
            next(error);
        }
    }

    async getHour(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId, id } = req.params; // Use locationId instead of mountainId
            const hour = await HoursModel.findByIdAndLocation(id, locationId);
            if (!hour) {
                res.status(404).json({ message: 'Hour not found' });
                return;
            }
            res.status(200).json(hour);
        } catch (error) {
            next(error);
        }
    }

    async updateHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId, id } = req.params; // Use locationId instead of mountainId
            const updatedData = req.body;
            const updatedHour = await HoursModel.updateByLocation(id, locationId, updatedData);
            if (!updatedHour) {
                res.status(404).json({ message: 'Hour not found' });
                return;
            }
            res.status(200).json(updatedHour);
        } catch (error) {
            next(error);
        }
    }

    async deleteHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params; // locationId is not needed for deletion
            const deletedHour = await HoursModel.deleteByLocation(id);
            if (!deletedHour) {
                res.status(404).json({ message: 'Hour not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HoursController();