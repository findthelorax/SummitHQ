import { Request, Response } from 'express';
import TrailCheckModel from '../../models/logs/trailCheckModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class TrailCheckController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId } = req.params;
        const data = { ...req.body, mountainId, trailId };
        const result = await TrailCheckModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId } = req.params;
        const result = await TrailCheckModel.findAllByMountainAndTrail(mountainId, trailId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId, trailCheckId } = req.params;
        const result = await TrailCheckModel.findByIdAndMountainAndTrail(trailCheckId, mountainId, trailId);
        if (!result) {
            res.status(404).json({ message: 'TrailCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId, trailCheckId } = req.params;
        const updatedData = req.body;
        const result = await TrailCheckModel.updateByIdAndMountainAndTrail(trailCheckId, mountainId, trailId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'TrailCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId, trailCheckId } = req.params;
        const result = await TrailCheckModel.deleteByIdAndMountainAndTrail(trailCheckId, mountainId, trailId);
        if (!result) {
            res.status(404).json({ message: 'TrailCheck not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new TrailCheckController();