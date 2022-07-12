import { ExpressResponseType } from './express-response.type';

export type ControllerResponseType = Promise<ExpressResponseType | void>;
