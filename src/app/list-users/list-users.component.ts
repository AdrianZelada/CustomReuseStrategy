import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AppService} from '../services/app.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  private list: Subject<any> = new Subject();
  public list$: Observable<any> = this.list.asObservable();
  public paginations: Array<any> = [];
  public pageSelect = 1;
  public total: number;
  public queryString: string;
  public userSelect: number;
  constructor(
    private router: Router,
    private appService: AppService
    ) {
    this.filterPage(this.pageSelect);
    console.log('%c constructor ListUsersComponent', 'background: #222; color: #29f1c3');
  }

  ngOnInit() {
    console.log('%c ngOnInit ListUsersComponent', 'background: #000; color: #fef160');
  }

  ngOnDestroy() {
    console.log('%c ngOnDestroy ListUsersComponent', 'background: #000; color: #d91e18');
  }

  goItem(item: any) {
    this.userSelect = item.id;
    this.router.navigate([`./users/${item.id}/photos`]);
  }

  filterPage(page: any) {
    this.appService.listUsers(page).pipe(
      map((res: any) => {
        this.pageSelect = res.page;
        this.total = res.total;
        this.paginations = Array(res.total_pages);
        return res.data;
      })
    ).subscribe((data) => {
      this.list.next(data);
    });
  }

}

//
// Conociendo este sencillo flujo sabemos que cada ves que vamos de Users a Photos haremos peticiones de Imágenes lo cual nos generaria bastante tráfico de red, lo ideal seria poder hacer solo una vez la carga de la imagenes por usuario
// Cuando nos dirigimos a la pantallas de photos veremos que haremos varias peticiones de las imágenes, ademas q se realiza un servicio pidiendo los datos de el usuario, y cuando nos dirigimos
// podriamos quizas hacer un servicio que se encargue de mantener los estados, pero podriamos cachear la ruta con el componente
