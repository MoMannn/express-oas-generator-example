import express from 'express';
import { Server } from 'http';
import { Context } from './context';
import expressOasGenerator from 'express-oas-generator';
import { inject as injectContext } from './middlewares/context';
import { inject as injectCors } from './middlewares/cors';
import { inject as injectErrors } from './middlewares/errors';
import { inject as injectDataParser } from './middlewares/parser';
import { inject as injectRenders } from './middlewares/renders';
import { inject as injectGetRoot } from './routes/get-root';

/**
 * ExpressJS request object interface which includes middlewares features.
 */
export interface Request extends express.Request {
  context: Context;
  body: { [key: string]: any };
  buffer: any;
}

/**
 * ExpressJS response object interface which includes middlewares features.
 */
export interface Response extends express.Response {
  respond(status: number, data: Object, meta?: Object): void;
  throw(status: number, errors: any): void;
}

/**
 * ExpressJS next function interface.
 */
export interface NextFunction extends express.NextFunction {}

/**
 * HTTP server exposes REST API.
 */
export class HttpServer {
  public app: express.Application;
  public server: Server;

  /**
   * Class constructor.
   * @param env Environment variables.
   * @param mongo Already connected mongodb.
   * @param provider Blockchain provider instance.
   */
  public constructor() {

    this.app = express();
    expressOasGenerator.handleResponses(this.app as any, {} as any);
    injectRenders(this.app);
    injectCors(this.app);
    injectContext(this.app);
    injectDataParser(this.app);
    injectGetRoot(this.app);
    injectErrors(this.app);
    expressOasGenerator.handleRequests();
  }

  /**
   * Starts the server.
   * @param host Server hostname.
   * @param port Server listening port.
   */
  public async listen() {

    await new Promise((resolve) => {
      this.server = this.app.listen(
        4444,
        'localhost',
        resolve as any,
      );
    });

    return this;
  }

  /**
   * Stops the server.
   */
  public async close() {

    await new Promise((resolve) => {
      this.server.close(resolve);
      this.server = null;
    });

    return this;
  }

  /**
   * Returns an array of all available routes.
   */
  public collectRoutes(): { method: string, path: string }[] {
    return this.app.router['stack']
      .map((middleware) => middleware.route)
      .filter((route) => !!route)
      .map((route) => (
        Object.keys(route.methods).map((method) => ({
          method: method.toUpperCase(),
          path: route.path,
        }))
      ))
      .reduce((a, b) => a.concat(b), [])
      .sort((a, b) => `${a.path}@${a.method}`.localeCompare(`${b.path}@${b.method}`));
  }

}
