import { Component } from '@angular/core';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.css']
})
export class SearchByComponent {
  searchByArr = [
    "price", "sale", "descrp", "discount", "categories", "name"
  ]
}
