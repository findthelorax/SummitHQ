import { Request, Response } from 'express';
import AidRoomCheckModel from '../../models/logs/aidRoomCheckModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class AidRoomCheckController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, aidRoomId } = req.params;
        const data = { ...req.body, mountainId, aidRoomId };
        const result = await AidRoomCheckModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, aidRoomId } = req.params;
        const result = await AidRoomCheckModel.findAllByMountainAndAidRoom(mountainId, aidRoomId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
        const result = await AidRoomCheckModel.findByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId);
        if (!result) {
            res.status(404).json({ message: 'AidRoomCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
        const updatedData = req.body;
        const result = await AidRoomCheckModel.updateByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'AidRoomCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
        const result = await AidRoomCheckModel.deleteByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId);
        if (!result) {
            res.status(404).json({ message: 'AidRoomCheck not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new AidRoomCheckController();