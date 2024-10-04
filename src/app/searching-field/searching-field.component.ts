import { UserService } from './../user.service';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Person } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searching-field',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './searching-field.component.html',
  styleUrl: './searching-field.component.css'
})
export class SearchingFieldComponent {

  @Input()
  people: Person[] = []
  
  @Input() peopleLength: number = 0;
  
  pessoa: Person = {
    id: "15",
    nome: "Jubiscleudo",
    cpf: "192391239",
    nascimento: "",
    email: "1111",
  };



  constructor(private userService: UserService){}

  getPersonById (id: number) {
    this.userService.getPerson(id).subscribe((data)=>{
      let p: Person = data;
      this.people = [];
      this.people.push(p);
    })
  }

  nomeDaPessoa: string = "";
  getPersonByName (nome: string) {
    this.userService.getUsers().subscribe((data)=>{
      let matchingPp = [];
      for(let i=0; i<data.length; i++){
        if(new RegExp(`${nome}`).test(data[i].nome)){
          matchingPp.push(data[i]);
        }
      }
      this.people = matchingPp;
      // alert(`Para ${nome}: \n${JSON.stringify(this.people)}`);
    })
  }

  @Output() search = new EventEmitter<Person[]>();
  callSearch(name: string): void{
      setTimeout(()=>{
        this.getPersonByName(name);
        this.search.emit(this.people);
      })  
  }

  @Output() create = new EventEmitter<Person>();

  callPersonCreation(): void {
    this.create.emit(this.pessoa);
  }
}
