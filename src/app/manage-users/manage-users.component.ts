import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
 users = [
  "Austin","Nyx","Nova","Summer","Deian","Cortney",
 "Austin","Nyx","Nova","Summer","Deian","Cortney"
];
constructor(public _navSelection: NavigationService)
{

}
}
