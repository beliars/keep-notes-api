import { Component, HttpStatus } from '@nestjs/common';

@Component()
export class ErrorsService {
  parse(err) {
    console.log('ERROR', err);

    if (err.name === 'BulkWriteError' && err.code === 11000) {
      const field = err.message.match(/index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i);
      let messageField = field[1] || field[2];
      if (messageField === 'url') messageField = 'name';
      err.message = `${messageField} is already exist`;
      err.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    if (err.name === 'ValidationError') {
      err.status = HttpStatus.UNPROCESSABLE_ENTITY;
      const message: any[] = [];
      for (const field in err.errors) {
        message.push({
          field,
          message: err.errors[field].message,
        });
      }
      err.message = message;
    }
    if (err.name === 'CastError') {
      err.message = `${err.path} not found`;
      err.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    return err;
  }
}
