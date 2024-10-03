import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchingFieldComponent } from '../searching-field/searching-field.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { Person } from '../user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-box',
  standalone: true,
  imports: [SearchingFieldComponent, DataTableComponent],
  templateUrl: './main-box.component.html',
  styleUrl: './main-box.component.css'
})
export class MainBoxComponent implements OnInit{
  people: Person[] = [];
  maxId: number = 0;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}
  
  getActualPeople() {
    this.userService.getUsers().subscribe((data)=>{
      this.people = data;
      this.maxId = data.length;
      alert(`${this.maxId} <- ${data.length}`);
    })
    
  }

  addPerson(pessoaCadastrada: Person): void{
    // this.people.push(pessoaCadastrada);
    this.userService.createPerson(pessoaCadastrada).subscribe((data)=>{});
    this.maxId+=1; 
  }
  
  attSearch(pessoasPesquisadas: Person[]): void{
    this.people = pessoasPesquisadas;
    alert(JSON.stringify(this.people))

  }


  ngOnInit(){
    this.getActualPeople();
    // alert(this.people.length);
    // this.maxId = this.people[this.people.length-1].id;
  }  
  
}


