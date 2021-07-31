import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { SearchFieldDataSource, SearchFieldResult } from 'ngx-mat-search-field';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geld';

  ingrediantcount = [1]
  result = ""
  searchFieldDataSource: SearchFieldDataSource;

  constructor(private httpClient: HttpClient) {
    this.searchFieldDataSource = {
      search(search: string, size: number, skip: number): Observable<SearchFieldResult> {
        if(!search )
          return of({} as SearchFieldResult);
        return httpClient.get("https://sky.coflnet.com/api/item/search/" + search).pipe(map((data: any) => {
    
          return {
            info: {
              count: 5
            },
            items: data.map((item: any) => {
              console.log(item)
              return {
                title: item.name,
                value: item.id
              };
            })
          };
        }));
      }
    };

  }

  add() {


    this.ingrediantcount.push(this.ingrediantcount.length + 1);
    console.log(this.ingrediantcount);
    console.log("add works")
  };



  // btoa()

  test() {
    console.log("lol")
  }

  remove(index: number) {

  }

  search(val: string) {
    this.httpClient.get("...." + val).subscribe(result => {
      console.log(result)
    })
  }






}
