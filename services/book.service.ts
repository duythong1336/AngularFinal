import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getItems():Observable <Book[]>{
    return this.http.get<Book[]>('http://localhost:8000/api/items/');
  }
  insertItem(item:Book): Observable<Book> {
    	const headers = { 'content-type': 'application/json'} 
    //	console.log(JSON.stringify(item))						
      return this.http.post<Book>('http://localhost:8000/api/insert/', item, {'headers':headers});

  }
  updateItem(item: Book): Observable<Book>{
    const headers = { 'content-type': 'application/json'}
    console.log(JSON.stringify(item));
    return this.http.put<Book>('http://localhost:8000/api/update', item , {
      headers: headers,
    })

  }
  deleteItem(id: string): Observable<ArrayBuffer> {
    const headers = {'content-type': 'application/json'};
    console.log(id);
    return this.http.delete<ArrayBuffer>(
      'http://localhost:8000/api/delete/:' + id,
      {headers: headers}
    );
  }
}
