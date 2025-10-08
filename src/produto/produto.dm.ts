import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";
import { AlterarProdutoDto } from "./dto/alterarProduto.dto";
import { ProdutosDatabase } from "../database/produtos.database";

@Injectable()
export class ProdutoArmazenado {
  private readonly db = ProdutosDatabase.instance;

  get produtos(): ProdutoEntity[] {
    return this.db.produtos;
  }

  adicionarProduto(produto: ProdutoEntity) {
    this.db.adicionarProduto(produto);
  }

  atualizaProduto(id: string, dados: AlterarProdutoDto): ProdutoEntity {
    const produto = this.db.produtos.find((p) => p.id === id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    if (dados.nome) produto.nome = dados.nome;
    if (dados.marca) produto.marca = dados.marca;
    if (dados.peso) produto.peso = dados.peso;
    if (dados.preco) produto.preco = dados.preco;

    return produto;
  }

  removeProduto(id: string): ProdutoEntity {
    const produto = this.db.produtos.find((p) => p.id === id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    this.db.removerProduto(id);
    return produto;
  }
}
