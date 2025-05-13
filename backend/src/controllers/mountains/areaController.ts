import { Request, Response, NextFunction } from 'express';
import AreaModel from '../../models/mountains/areaModel';

class AreaController {
    async createArea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

            const result = await AreaModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getArea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, areaId } = req.params;

            const result = await AreaModel.findByIdAndMountain(areaId, mountainId);
            if (!result) {
                res.status(404).json({ message: 'Area not found' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAreas(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;

            const result = await AreaModel.findAllByMountain(mountainId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateArea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { areaId } = req.params;
            const updatedData = req.body;

            const result = await AreaModel.updateById(areaId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'Area not found' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteArea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { areaId } = req.params;

            const result = await AreaModel.deleteById(areaId);
            if (!result) {
                res.status(404).json({ message: 'Area not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async addAreaToLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params;
            const { areaId } = req.body;

            const result = await AreaModel.addAreaToLocation(locationId, areaId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAreaInLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params;
            const updatedData = req.body;

            const result = await AreaModel.updateAreaInLocation(locationId, updatedData.mountainId, updatedData);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async removeAreaFromLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params;

            const result = await AreaModel.removeAreaFromLocation(locationId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new AreaController();