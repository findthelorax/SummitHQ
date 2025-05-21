import { Request, Response } from 'express';
import HoursModel from '../../models/mountains/hoursModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class HoursController {
    createHours = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const data = req.body;
        const hours = await HoursModel.create(locationId, data);
        res.status(201).json(hours);
    });

    getHours = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const hours = await HoursModel.findAllByLocation(locationId);
        res.status(200).json(hours);
    });

    getHour = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, hourId } = req.params;
        const hour = await HoursModel.findByIdAndLocation(hourId, locationId);
        if (!hour) {
            res.status(404).json({ message: 'Hour not found' });
            return;
        }
        res.status(200).json(hour);
    });

    updateHours = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, hourId } = req.params;
        const updatedData = req.body;
        const updatedHour = await HoursModel.updateByLocation(hourId, locationId, updatedData);
        if (!updatedHour) {
            res.status(404).json({ message: 'Hour not found' });
            return;
        }
        res.status(200).json(updatedHour);
    });

    deleteHours = asyncWrapper(async (req: Request, res: Response) => {
        const { hourId } = req.params;
        const deletedHour = await HoursModel.deleteByLocation(hourId);
        if (!deletedHour) {
            res.status(404).json({ message: 'Hour not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new HoursController();