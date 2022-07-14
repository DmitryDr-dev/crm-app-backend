import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { HttpError } from '../../../app-modules/error/http-error';
import { ILoggerService } from '../../../app-modules/logger';
import { BaseController } from '../../../common/controller';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { AUTH_TYPES } from '../../../common/ioc/auth-bindings';
import { CONTACTS_TYPES } from '../../../common/ioc/contact-bindings';
import { IBaseMiddleware } from '../../../common/middleware';
import { ControllerResponseType } from '../../../common/types';
import { HttpCode } from '../../../lib/constants';
import { ValidationMiddleware } from '../../../middlewares/validation';
import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';
import { IContactsService } from '../service';
import { IContactsController } from './contacts.controller.interface';

@injectable()
export class ContactsController
  extends BaseController
  implements IContactsController
{
  constructor(
    @inject(APP_TYPES.ILoggerService) protected logger: ILoggerService,
    @inject(CONTACTS_TYPES.IContactsService)
    private contactsService: IContactsService,
    @inject(AUTH_TYPES.AuthGuard) protected authGuard: IBaseMiddleware,
  ) {
    super(logger);

    this.createRoutes([
      {
        method: 'get',
        path: '/',
        middlewares: [this.authGuard],
        func: this.getContacts,
      },
      {
        method: 'get',
        path: '/:id',
        middlewares: [this.authGuard],
        func: this.getContactById,
      },
      {
        method: 'post',
        path: '/',
        middlewares: [
          this.authGuard,
          new ValidationMiddleware(CreateContactRequestDTO),
        ],
        func: this.createContact,
      },
      {
        method: 'patch',
        path: '/:id',
        middlewares: [
          this.authGuard,
          new ValidationMiddleware(UpdateContactRequestDTO),
        ],
        func: this.updateContact,
      },
      {
        method: 'delete',
        path: '/:id',
        middlewares: [this.authGuard],
        func: this.deleteContact,
      },
    ]);
  }

  public async getContacts(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id: userId } = res.locals.user;
    const contacts = await this.contactsService.getContacts(userId);

    if (contacts) {
      return res.status(HttpCode.Ok).json({
        data: { ...contacts },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Items Not Found'));
  }

  public async getContactById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const { id: userId } = res.locals.user;
    const contact = await this.contactsService.getContactById(id, userId);

    if (contact) {
      return res.status(HttpCode.Ok).json({
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }

  public async createContact(
    req: Request<{}, {}, CreateContactRequestDTO>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id: userId } = res.locals.user;
    const contact = await this.contactsService.createContact(req.body, userId);

    if (contact) {
      return res.status(HttpCode.Created).json({
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.BadRequest, 'Bad Request'));
  }

  public async updateContact(
    req: Request<ParamsDictionary, {}, UpdateContactRequestDTO>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const { id: userId } = res.locals.user;
    const contact = await this.contactsService.updateContact(
      id,
      userId,
      req.body,
    );

    if (contact) {
      return res.status(HttpCode.Ok).json({
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }

  public async deleteContact(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const { id: userId } = res.locals.user;
    const contact = await this.contactsService.deleteContact(id, userId);

    if (contact) {
      return res.status(HttpCode.Ok).json({
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }
}
