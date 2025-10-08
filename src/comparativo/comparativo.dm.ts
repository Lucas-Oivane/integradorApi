import { Injectable } from '@nestjs/common';
import { ProdutosDatabase } from '../database/produtos.database';
import { ComparativoEntity } from './comparativo.entity';

@Injectable()
export class ComparativoDM {
  private readonly db = ProdutosDatabase.instance;

  /**
   * Gera os dados de comparativo de preços para gráficos.
   * Converte o preço de string para number.
   */
  gerarComparativo(produtos: string[], mercados: { nome: string; precos: Record<string, string> }[]): ComparativoEntity[] {
    const comparativo: ComparativoEntity[] = [];

    produtos.forEach(produto => {
      const registro = new ComparativoEntity(produto); // cria registro para o produto

      mercados.forEach(mercado => {
        const precoString = mercado.precos[produto];
        registro.precos[mercado.nome] = precoString || "0"; // mantém preço como string
      });

      comparativo.push(registro);
    });

    return comparativo;
  }

  /**
   * Método auxiliar para gerar o comparativo completo usando produtos e mercados do banco local
   */
  gerarComparativoCompleto(produtosSelecionados: string[]): ComparativoEntity[] {
    const produtosObj = this.db.produtos.filter(p => produtosSelecionados.includes(p.nome));

    const mercadosFormatados = this.db.mercados.map(mercado => ({
      nome: mercado.nome,
      precos: produtosObj.reduce((acc, produto) => {
        acc[produto.nome] = produto.preco; // string
        return acc;
      }, {} as Record<string, string>),
    }));

    return this.gerarComparativo(produtosSelecionados, mercadosFormatados);
  }
}
