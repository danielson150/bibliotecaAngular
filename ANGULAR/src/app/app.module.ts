import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivrosComponent } from './livros/livros.component';
import { GenerosComponent } from './generos/generos.component';
import { EstantesComponent } from './estantes/estantes.component';
import { PrateleirasComponent } from './prateleiras/prateleiras.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { LivroDetailComponent } from './livro-detail/livro-detail.component';
import { EmprestimoDetailComponent } from './emprestimo-detail/emprestimo-detail.component';
import { PrateleiraDetailComponent } from './prateleira-detail/prateleira-detail.component';
import { GeneroDetailComponent } from './genero-detail/genero-detail.component';
import { EstanteDetailComponent } from './estante-detail/estante-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MultasComponent } from './multas/multas.component';
import { MultaDetailComponent } from './multa-detail/multa-detail.component';

import { LivroService } from './livro-service/livro.service';
import { EmprestimoService } from './emprestimo-service/emprestimo.service';
import { PrateleiraService } from './prateleira-service/prateleira.service';
import { GeneroService } from './genero-service/genero.service';
import { EstanteService } from './estante-service/estante.service';
import { UserService } from './user-service/user.service';
import { MultaService } from './multa-service/multa.service'



@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
    GenerosComponent,
    EstantesComponent,
    PrateleirasComponent,
    EmprestimosComponent,
    LivroDetailComponent,
    MessagesComponent,
    EmprestimoDetailComponent,
    PrateleiraDetailComponent,
    GeneroDetailComponent,
    EstanteDetailComponent,
    UsersComponent,
    UserDetailComponent,
    MultasComponent,
    MultaDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LivroService, EmprestimoService, PrateleiraService, GeneroService, EstanteService, UserService, MultaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
