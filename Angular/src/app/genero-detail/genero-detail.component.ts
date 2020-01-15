import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GeneroService } from '../genero-service/genero.service'
import { LivroService } from '../livro-service/livro.service'

@Component({
  selector: 'app-genero-detail',
  templateUrl: './genero-detail.component.html',
  styleUrls: ['./genero-detail.component.css']
})
export class GeneroDetailComponent implements OnInit {
  livros : Array<any>;
  genero : any;
  
  constructor(
    private route: ActivatedRoute,
    private generoService: GeneroService,
    private livroService : LivroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.genero = {
      nome: ''
    };
    this.getGenero();
    this.getLivros();
  }

  getLivros(): void {
    this.livroService.searchLivros(this.genero.nome)
        .subscribe(livros => this.livros = livros.results);
  }
  
  getGenero(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.generoService.getGenero(pk)
        .subscribe(genero => this.genero = genero);
    }
  }

  updateGenero(): void {
    this.generoService.updateGenero(this.genero)
      .subscribe(() => this.getGenero());
  }

  deleteGenero(): void {
    const pk = +this.route.snapshot.paramMap.get('pk')
    this.generoService.delGenero(pk)
      .subscribe(genero => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}
