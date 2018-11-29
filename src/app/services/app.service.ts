import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  host: string = 'https://reqres.in/api';
  hostPlaceholder: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  listUsers(page: any) {
    return this.http.get(`${this.host}/users?per_page=6&page=${page}`);
  }

  listAlbums(userId: any) {
    return this.http.get(`${this.hostPlaceholder}/albums?userId=${userId}`);
  }

  listPhotos(albumId: any){
    return this.http.get(`${this.hostPlaceholder}/photos?albumId=${albumId}`);
  }
}
