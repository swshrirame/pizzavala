import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router) {
  }
  
  onLogout() {
    
    // clear the session storage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user_name')
    sessionStorage.removeItem('id')

    this.router.navigate(['/auth/signin'])
  }
  
  ngOnInit(): void {
  }

}