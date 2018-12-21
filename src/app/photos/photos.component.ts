import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../services/app.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  private list: Subject<any> = new Subject();
  public list$: Observable<any> = this.list.asObservable();

  public user: any = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    console.log('%c constructor ListUsersComponent', 'background: #222; color: #29f1c3');
  }

  ngOnInit() {
    console.log('%c ngOnInit PhotosComponent', 'background: #000; color: #fef160');
    this.list$ = this.route.paramMap.pipe(
      switchMap( (data: any) =>{
        const params = data.params || {};
        return this.appService.singleUser(params.idUser);
      }),
      switchMap((data: any) => {
        this.user = data;
        return this.appService.listPhotos(data.id);
      })
    );
  }

  ngOnDestroy() {
    console.log('%c ngOnDestroy ListUsersComponent', 'background: #000; color: #d91e18');
  }
}
