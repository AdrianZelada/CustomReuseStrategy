import { Component } from '@angular/core';
import {Router , NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((route: any) => {
      console.log(`%c Route ======>  %c ${route.url}`, 'color:red;', 'color: blue');
    });
  }
}
