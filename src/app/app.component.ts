import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBoxComponent } from "./main-box/main-box.component";
import { SearchingFieldComponent } from "./searching-field/searching-field.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { UserService } from './user.service';
import { Person } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainBoxComponent, SearchingFieldComponent, DataTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'AngularCrud';

  people: Person[] = [
  
  ]

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userService.getUsers().subscribe({
    //   next: (data) => {
    //     this.people = data;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao obter os usuários:', err);
    //   }
    // });
  }
}

