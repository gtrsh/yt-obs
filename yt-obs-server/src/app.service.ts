import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): any {
    return { hello: ['this', 'is', 'test', 42] }
  }
}
