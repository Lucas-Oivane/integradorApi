import { Injectable } from '@nestjs/common';
import { MercadoEntity } from './mercado.entity';
import { ProdutosDatabase } from '../database/produtos.database';

@Injectable()
export class MercadosArmazenados {
  private readonly db = ProdutosDatabase.instance;

  // Adiciona um novo mercado no banco local
  adicionarMercado(mercado: MercadoEntity) {
    this.db.adicionarMercado(mercado);
  }

  // Verifica se já existe mercado com o mesmo nome
  async nomeJaExiste(nome: string): Promise<boolean> {
    const mercadoEncontrado = this.db.mercados.find(
      mercado => mercado.nome.toLowerCase() === nome.toLowerCase()
    );
    return mercadoEncontrado !== undefined;
  }

  // Método privado para buscar mercado por ID
  private buscaPorID(id: string): MercadoEntity {
    const mercado = this.db.mercados.find(m => m.id === id);
    if (!mercado) {
      throw new Error('Mercado não encontrado');
    }
    return mercado;
  }

  // Método público para permitir que o controller busque por ID
  public buscarMercado(id: string): MercadoEntity {
    return this.buscaPorID(id);
  }

  // Remove mercado pelo ID
  async removeMercado(id: string): Promise<MercadoEntity> {
    const mercado = this.buscaPorID(id);
    this.db.removerMercado(id);
    return mercado;
  }

  // Atualiza mercado pelo ID, alterando apenas os campos informados
  async atualizaMercado(
    id: string,
    dados: Partial<MercadoEntity>
  ): Promise<MercadoEntity> {
    const mercado = this.buscaPorID(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') return;
      if (valor === undefined) return;
      mercado[chave] = valor;
    });

    return mercado;
  }

  // Getter para acessar todos os mercados
  get mercados(): MercadoEntity[] {
    return this.db.mercados;
  }
}
