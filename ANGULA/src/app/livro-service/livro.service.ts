import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
 
  private livrosUrl : string = 'http://localhost:8000/livros/';
  private livroSearchUrl : string = 'http://localhost:8000/livros/?search=';
  private livrosOrderUrl : string = 'http://localhost:8000/livros/?ordering=';
  private searchorderUrl : string = '&search='
  private paginateUrl : string = '?page='
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginateLivro(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.livrosUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  searchLivros(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.livroSearchUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca livros', []))
    );
  }
  
  orderLivros(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.livrosOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca livros', []))
    );
  }
  
  orderSearchLivros(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.livrosOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca esta livros', []))
    );
  }

  getLivros(): Observable<any> {
    if (localStorage.getItem("username") != null){
      return this.http.get<Array<any>>(this.livrosUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
      }).pipe(
        tap(_ => this.log('fetched livros')),
        catchError(this.handleError<Array<any>>('getLivros', []))
      );
    }
    else{
      return this.http.get<Array<any>>(this.livrosUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }).pipe(
        tap(_ => this.log('fetched livros')),
        catchError(this.handleError<Array<any>>('getLivros', []))
      );
    }
  }

  getLivro(pk: number): Observable<any> {
    return this.http.get<Array<any>>(`${this.livrosUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`fetched livro id=${pk}`)),
      catchError(this.handleError<any>(`getLivro id=${pk}`))
    );
  }

  updateLivro (livro: any): Observable<any> {
    return this.http.put(`${this.livrosUrl}${livro.pk}`, livro, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`updated livro id=${livro.id}`)),
      catchError(this.handleError<any>('updateLivro'))
    );
  }

  addLivro(livro: any): Observable<any> {
    return this.http.post<Array<any>>(this.livrosUrl, livro, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newLivro: any) => this.log(`added livro w/ id=${newLivro.pk}`)),
      catchError(this.handleError<any>('addLivro'))
    );
  }

  delLivro(pk: number){
    return this.http.delete<any>(`${this.livrosUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`deleted livro id=${pk}`)),
      catchError(this.handleError<any>('delLivro'))
    );
  }

  log(message: string) {
    this.messageService.add(`LivroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.log(error);
      
      this.log(`${operation}`);

      return of(result as T);
    };
  }
}
