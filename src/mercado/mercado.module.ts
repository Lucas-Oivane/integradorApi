import { Module } from '@nestjs/common';
import { MercadosArmazenados } from './mercado.dm';
import { NomeUnicoMercadoValidator } from './validacao/nomeUnico.validator';

@Module({
  providers: [MercadosArmazenados, NomeUnicoMercadoValidator],
  exports: [MercadosArmazenados],
})
export class MercadoModule {}
