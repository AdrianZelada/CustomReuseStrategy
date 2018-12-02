import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../services/app.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  private list: Subject<any> = new Subject();
  public list$: Observable<any> = this.list.asObservable();
  public queryString: string = '';
  public idUser: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    console.log("ngOnInit albums");
    this.list$ = this.route.paramMap.pipe(
      switchMap((data: any) => {
        const params = data.params || {};
        this.idUser = params.id;
        return this.appService.listAlbums(params.id);
      })
    );
  }

  goItem(item: any) {
    this.router.navigate([`./users/${this.idUser}/albums/${item.id}/photos`]);

  }

}
