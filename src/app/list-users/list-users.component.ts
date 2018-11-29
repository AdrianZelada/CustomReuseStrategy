import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AppService} from '../services/app.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  private list: Subject<any> = new Subject();
  public list$: Observable<any> = this.list.asObservable();
  public paginations: Array<any> = [];
  public pageSelect: number = 1;
  public total: number = 0;

  public queryString: string ="";
  constructor(
    private router: Router,
    private appService: AppService
    ) {
    this.filterPage(this.pageSelect);
  }

  ngOnInit() {}

  goItem(item: any) {
    this.router.navigate([`./users/${item.id}/albums`]);
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
