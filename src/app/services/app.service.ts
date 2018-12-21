import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  host: String = 'https://reqres.in/api';
  hostPlaceholder: String = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  listUsers(page: any) {
    return this.http.get(`${this.host}/users?per_page=6&page=${page}`);
  }

  singleUser(user: any) {
    return this.http.get(`${this.host}/users/${user}`).pipe(
      map((response: any) => {
        return response.data || {};
      })
    );
  }

  listPhotos(albumId: any) {
    return this.http
      .get(`${this.hostPlaceholder}/photos?albumId=${albumId}`)
      .pipe(
        map((result: Array<any>) => {
          return result.slice(0, 20);
        })
      );
  }
}
