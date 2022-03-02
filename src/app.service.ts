import { Injectable } from '@nestjs/common';
import * as ormconfig from '../ormconfig';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(ormconfig);
    return 'Hello World!';
  }
}
