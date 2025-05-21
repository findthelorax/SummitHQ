import { Request, Response } from 'express';
import HutCheckModel from '../../models/logs/hutCheckModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class HutCheckController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId } = req.params;
        const data = { ...req.body, mountainId, hutId };
        const result = await HutCheckModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId } = req.params;
        const result = await HutCheckModel.findAllByMountainAndHut(mountainId, hutId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId, hutCheckId } = req.params;
        const result = await HutCheckModel.findByIdAndMountainAndHut(hutCheckId, mountainId, hutId);
        if (!result) {
            res.status(404).json({ message: 'HutCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId, hutCheckId } = req.params;
        const updatedData = req.body;
        const result = await HutCheckModel.updateByIdAndMountainAndHut(hutCheckId, mountainId, hutId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'HutCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId, hutCheckId } = req.params;
        const result = await HutCheckModel.deleteByIdAndMountainAndHut(hutCheckId, mountainId, hutId);
        if (!result) {
            res.status(404).json({ message: 'HutCheck not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new HutCheckController();