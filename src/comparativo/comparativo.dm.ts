
import { Injectable } from '@nestjs/common';
import { ComparativoEntity } from './comparativo.entity';

@Injectable()
export class ComparativoDM {

  gerarComparativo(
    produtos: string[],
    mercados: { nome: string; precos: Record<string, number> }[],
  ): ComparativoEntity[] {
    const resultado: ComparativoEntity[] = [];

    produtos.forEach(produto => {
      const item = new ComparativoEntity(produto);

      mercados.forEach(mercado => {
        const preco = mercado.precos[produto] ?? 0; // se não tiver preço, usa 0
        item[mercado.nome] = preco;
      });

      resultado.push(item);
    });

    return resultado;
  }
}
