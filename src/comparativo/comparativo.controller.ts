import { Body, Controller, Post } from '@nestjs/common';
import { ComparativoDM } from './comparativo.dm';
import { ComparativoDto } from './dto/comparativo.dto';
import { ComparativoEntity } from './comparativo.entity';
import { ProdutosDatabase } from '../database/produtos.database';

@Controller('comparativo')
export class ComparativoController {
  constructor(private readonly comparativoDM: ComparativoDM) {}

    @Post()
    gerar(@Body() dto: ComparativoDto): ComparativoEntity[] {
    const db = ProdutosDatabase.instance;

    const produtosSelecionados = db.produtos.filter(p =>
        dto.produtos.includes(p.nome)
    );

    const mercados = db.mercados.map(mercado => ({
        nome: mercado.nome,
        precos: produtosSelecionados.reduce((acc, produto) => {
        acc[produto.nome] = produto.preco.toString(); // converte para string
        return acc;
        }, {} as Record<string, string>),
    }));

    return this.comparativoDM.gerarComparativo(
        produtosSelecionados.map(p => p.nome),
        mercados
    );
    }
}
