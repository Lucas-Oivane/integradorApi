export class ComparativoEntity {
  produto: string;                  // nome do produto
  precos: Record<string, string>;   // mercado -> preço como string

  constructor(produto: string) {
    this.produto = produto;
    this.precos = {};               // inicializa corretamente
  }
}
