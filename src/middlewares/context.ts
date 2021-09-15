import { Application, RequestHandler } from 'express';
import { Context } from '../context';
import { NextFunction, Request, Response } from '../http';

/**
 * Applies context middleware to application.
 * @param app ExpressJS application.
 * @param env Environment instance.
 * @param mongo MongoDb instance.
 */
export function inject(app: Application): void {
  app.use(createContext());
}

/**
 * Returns a middleware which creates a new context object for each request and
 * saves it to the request object.
 * @param env ENV variables.
 * @param mongo MongoDb instance.
 * @param provider Blockchain provider instance.
 */
export function createContext(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.context = new Context();
    next();
  };
}
