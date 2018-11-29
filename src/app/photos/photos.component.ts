import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../services/app.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  private list: Subject<any> = new Subject();
  public list$: Observable<any> = this.list.asObservable();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    console.log("constructor PhotosComponent")

  }

  ngOnInit() {
    console.log("ngOnInit PhotosComponent")
    this.list$ = this.route.paramMap.pipe(
      switchMap((data: any) => {
        const params = data.params || {};
        console.log('route');
        return this.appService.listPhotos(params.idAlbum);
      })
    );
  }
}
