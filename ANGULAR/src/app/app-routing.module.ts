import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerosComponent } from './generos/generos.component'
import { GeneroDetailComponent } from './genero-detail/genero-detail.component'
import { LivrosComponent } from './livros/livros.component';
import { LivroDetailComponent }  from './livro-detail/livro-detail.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { UsersComponent } from './users/users.component';
import { EmprestimoDetailComponent } from './emprestimo-detail/emprestimo-detail.component';
import { PrateleirasComponent } from './prateleiras/prateleiras.component';
import { PrateleiraDetailComponent } from './prateleira-detail/prateleira-detail.component';
import { EstantesComponent } from './estantes/estantes.component';
import { EstanteDetailComponent } from './estante-detail/estante-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component'
import { MultasComponent } from './multas/multas.component';
import { MultaDetailComponent } from './multa-detail/multa-detail.component';


const routes: Routes = [
{ path: 'generos', component : GenerosComponent},
{ path: 'generos/:pk', component : GeneroDetailComponent},
{ path: 'estantes', component : EstantesComponent},
{ path: 'estantes/:pk', component : EstanteDetailComponent},
{ path: 'prateleiras', component : PrateleirasComponent},
{ path: 'prateleiras/:pk', component : PrateleiraDetailComponent}, 
{ path: 'livros', component : LivrosComponent}, 
{ path: 'livros/:pk', component: LivroDetailComponent },
{ path: 'emprestimos', component: EmprestimosComponent },
{ path: 'emprestimos/:pk', component: EmprestimoDetailComponent },
{ path: 'usuarios', component : UsersComponent},
{ path: 'usuarios/:pk', component : UserDetailComponent},
{ path: 'multas', component : MultasComponent},
{ path: 'multas/:pk', component : MultaDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
