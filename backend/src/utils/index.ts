import { Request, Response } from 'express';

export const logRequest = (req: Request, res: Response, next: Function) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export const validateMountainData = (data: any) => {
    const { name, height, location } = data;
    if (!name || !height || !location) {
        throw new Error('Missing required mountain data: name, height, and location are required.');
    }
};