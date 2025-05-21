import { Request, Response } from 'express';
import AreaModel from '../../models/mountains/areaModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class AreaController {
    createArea = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;

        const result = await AreaModel.create(mountainId, data);
        res.status(201).json(result);
    });

    getArea = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, areaId } = req.params;

        const result = await AreaModel.findByIdAndMountain(areaId, mountainId);
        if (!result) {
            res.status(404).json({ message: 'Area not found' });
            return;
        }

        res.status(200).json(result);
    });

    getAreas = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        const result = await AreaModel.findAllByMountain(mountainId);
        res.status(200).json(result);
    });

    updateArea = asyncWrapper(async (req: Request, res: Response) => {
        const { areaId } = req.params;
        const updatedData = req.body;

        const result = await AreaModel.updateById(areaId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'Area not found' });
            return;
        }

        res.status(200).json(result);
    });

    deleteArea = asyncWrapper(async (req: Request, res: Response) => {
        const { areaId } = req.params;

        const result = await AreaModel.deleteById(areaId);
        if (!result) {
            res.status(404).json({ message: 'Area not found' });
            return;
        }

        res.status(204).send();
    });

    addAreaToLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const { areaId } = req.body;

        const result = await AreaModel.addAreaToLocation(locationId, areaId);
        res.status(200).json(result);
    });

    updateAreaInLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const updatedData = req.body;

        const result = await AreaModel.updateAreaInLocation(locationId, updatedData.mountainId, updatedData);
        res.status(200).json(result);
    });

    removeAreaFromLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;

        const result = await AreaModel.removeAreaFromLocation(locationId);
        res.status(200).json(result);
    });
}

export default new AreaController();