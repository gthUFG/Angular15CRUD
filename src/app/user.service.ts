import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Person {
  id: string,
  nome: string,
  cpf: string,
  nascimento: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/person';

  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<Person[]> {
    return this._httpClient.get<Person[]>(this.apiUrl);
  }

  getPerson(id: number): Observable<Person> {
    return this._httpClient.get<Person>(`${this.apiUrl}/${id}`);
  }

  deletePerson(id: number): Observable<any> {
    return this._httpClient.delete<Person>(`${this.apiUrl}/${id}`);
  }

  updatePerson(id: number, p: Person): Observable<Person>{
    return this._httpClient.put<Person>(`${this.apiUrl}/${id}`, p);
  }
  
  createPerson(p: Person): Observable<Person>{
    return this._httpClient.post<Person>(`${this.apiUrl}`, p);
  }

}
  