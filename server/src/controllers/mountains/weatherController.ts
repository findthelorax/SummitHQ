import { Request, Response } from 'express';
import WeatherModel from '../../models/mountains/weatherModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class WeatherController {
    createWeather = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;
        const weather = await WeatherModel.create(mountainId, data);
        res.status(201).json(weather);
    });

    getWeather = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const weather = await WeatherModel.findAllByMountain(mountainId);
        res.status(200).json(weather);
    });

    getWeatherById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, weatherId } = req.params;
        const weather = await WeatherModel.findById(mountainId, weatherId);
        if (!weather) {
            res.status(404).json({ message: 'Weather not found' });
            return;
        }
        res.status(200).json(weather);
    });

    updateWeather = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, weatherId } = req.params;
        const data = req.body;
        const weather = await WeatherModel.updateById(mountainId, weatherId, data);
        res.status(200).json(weather);
    });

    deleteWeather = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, weatherId } = req.params;
        await WeatherModel.deleteById(mountainId, weatherId);
        res.status(204).send();
    });
}

export default new WeatherController();