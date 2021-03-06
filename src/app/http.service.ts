import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ImageInfo } from './imageInfo';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private address = 'http://localhost:4243';
  private imagesUrl = '/images/json?all=0';

  constructor(private http: Http) { }

  // get all images from docker deamon
  // getImageInfo(): Promise<ImageInfo[]> {
  //   return this.http.get((this.address + this.imagesUrl), { headers: this.headers })
  //     .toPromise()
  //     .then(response => response.json().data as ImageInfo[])
  //     .catch(this.handleError);
  // }

  getImageInfo(): Observable<ImageInfo[]> {
    return this.http.get(this.address + this.imagesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
