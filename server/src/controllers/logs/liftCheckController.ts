import { Request, Response } from 'express';
import LiftCheckModel from '../../models/logs/liftCheckModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class LiftCheckController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId } = req.params;
        const data = { ...req.body, mountainId, liftId };
        const result = await LiftCheckModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId } = req.params;
        const result = await LiftCheckModel.findAllByMountainAndLift(mountainId, liftId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId, liftCheckId } = req.params;
        const result = await LiftCheckModel.findByIdAndMountainAndLift(liftCheckId, mountainId, liftId);
        if (!result) {
            res.status(404).json({ message: 'LiftCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId, liftCheckId } = req.params;
        const updatedData = req.body;
        const result = await LiftCheckModel.updateByIdAndMountainAndLift(liftCheckId, mountainId, liftId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'LiftCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId, liftCheckId } = req.params;
        const result = await LiftCheckModel.deleteByIdAndMountainAndLift(liftCheckId, mountainId, liftId);
        if (!result) {
            res.status(404).json({ message: 'LiftCheck not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new LiftCheckController();