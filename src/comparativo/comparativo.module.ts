
import { Module } from '@nestjs/common';
import { ComparativoController } from './comparativo.controller';
import { ComparativoDM } from './comparativo.dm';

@Module({
  controllers: [ComparativoController],
  providers: [ComparativoDM],
  exports: [ComparativoDM],
})
export class ComparativoModule {}
