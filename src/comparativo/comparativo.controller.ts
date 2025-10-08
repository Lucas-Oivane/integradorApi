// src/comparativo/comparativo.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ComparativoDM } from './comparativo.dm';
import { ComparativoDto } from './dto/comparativo.dto';
import { ComparativoEntity } from './comparativo.entity';

@Controller('comparativo')
export class ComparativoController {
  constructor(private readonly comparativoDM: ComparativoDM) {}

  @Post()
  gerar(@Body() dto: ComparativoDto): ComparativoEntity[] {
    // Simulação de dados de mercados com preços
    const mercadosSimulados = dto.mercados.map(mercado => ({
      nome: mercado,
      precos: dto.produtos.reduce((acc, produto) => {
        acc[produto] = Math.floor(Math.random() * 20) + 1; // preços aleatórios entre 1 e 20
        return acc;
      }, {} as Record<string, number>),
    }));

    return this.comparativoDM.gerarComparativo(dto.produtos, mercadosSimulados);
  }
}
