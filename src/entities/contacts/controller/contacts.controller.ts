import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { CONTACTS_TYPES } from '../../../common/ioc/contact-bindings';
import { ControllerResponseType } from '../../../common/types';
import { HttpCode, ResponseStatus } from '../../../lib/constants';
import { HttpError } from '../../../app-modules/error/http-error';
import { ILoggerService } from '../../../app-modules/logger';
import { BaseController } from '../../../common/controller';
import { IContactsService } from '../service';
import { IContactsController } from './contacts.controller.interface';
import { ValidationMiddleware } from '../../../middlewares/validation-middleware';
import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';

@injectable()
export class ContactsController
  extends BaseController
  implements IContactsController
{
  constructor(
    @inject(APP_TYPES.ILoggerService) protected logger: ILoggerService,
    @inject(CONTACTS_TYPES.IContactsService)
    protected contactsService: IContactsService,
  ) {
    super(logger);

    this.createRoutes([
      {
        method: 'get',
        path: '/',
        func: this.getContacts,
      },
      {
        method: 'get',
        path: '/:id',
        func: this.getContactById,
      },
      {
        method: 'post',
        path: '/',
        middlewares: [new ValidationMiddleware(CreateContactRequestDTO)],
        func: this.createContact,
      },
      {
        method: 'patch',
        path: '/:id',
        middlewares: [new ValidationMiddleware(UpdateContactRequestDTO)],
        func: this.updateContact,
      },
      {
        method: 'delete',
        path: '/:id',
        func: this.deleteContact,
      },
    ]);
  }

  async getContacts(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const contacts = await this.contactsService.getContacts();

    if (contacts) {
      return res.status(HttpCode.Ok).json({
        status: ResponseStatus.Ok,
        code: HttpCode.Ok,
        data: { ...contacts },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Items Not Found'));
  }

  async getContactById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const contact = await this.contactsService.getContactById(id);

    if (contact) {
      return res.status(HttpCode.Ok).json({
        status: ResponseStatus.Ok,
        code: HttpCode.Ok,
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }

  async createContact(
    req: Request<{}, {}, CreateContactRequestDTO>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const contact = await this.contactsService.createContact(req.body);

    if (contact) {
      return res.status(HttpCode.Created).json({
        status: ResponseStatus.Ok,
        code: HttpCode.Created,
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.BadRequest, 'Bad Request'));
  }

  async updateContact(
    req: Request<ParamsDictionary, {}, UpdateContactRequestDTO>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const contact = await this.contactsService.updateContact(id, req.body);

    if (contact) {
      return res.status(HttpCode.Ok).json({
        status: ResponseStatus.Ok,
        code: HttpCode.Ok,
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }

  async deleteContact(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { id } = req.params;
    const contact = await this.contactsService.deleteContact(id);

    if (contact) {
      return res.status(HttpCode.Ok).json({
        status: ResponseStatus.Ok,
        code: HttpCode.Ok,
        data: { contact },
      });
    }

    return next(new HttpError(HttpCode.NotFound, 'Item Not Found'));
  }
}
