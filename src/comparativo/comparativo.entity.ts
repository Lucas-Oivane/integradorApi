export class ComparativoEntity {
  produto: string;
  [mercado: string]: string | number;

  constructor(produto: string) {
    this.produto = produto;
  }
}
