import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuariosArmazenados } from './usuario/usuario.dm';


@Module({
  imports: [UsuarioModule],
  controllers: [UsuarioController],
  providers: [UsuariosArmazenados],
})
export class AppModule {}
