import { Router } from 'express';
import WeatherController from '../../controllers/mountains/weatherController.js';

const router = Router();

router.post('/:mountainId/weather', WeatherController.createWeather);
router.get('/:mountainId/weather', WeatherController.getWeather);
router.get('/:mountainId/weather/:weatherId', WeatherController.getWeatherById);
router.put('/:mountainId/weather/:weatherId', WeatherController.updateWeather);
router.delete('/:mountainId/weather/:weatherId', WeatherController.deleteWeather);

export default router;