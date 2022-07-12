import { Request, Response, NextFunction } from 'express';
import { ControllerResponseType } from '../../../common/types';

export interface IContactsController {
  getContacts: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  getContactById: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  createContact: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  updateContact: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  deleteContact: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;
}
