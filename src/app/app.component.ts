import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  JSONData = [
    { name: 'type 1', id: '1', isSelect: true },
    { name: 'type 2', id: '2', isSelect: true },
    { name: 'type 3', id: '3', isSelect: true },
    { name: 'type 4', id: '4', isSelect: true },
  ];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((query) => {
      console.log(query);
      if(query.id) {
      this.ChangeJSONEvent(query);
      this.ChangeEvent();
      }
    });
  }

  ChangeEvent() {
    console.log(this.JSONData);
    let ids = this.JSONData.map((x) => {
      if (x.isSelect) {
        return Number(x.id);
      }
    }).filter(y => y).join(',');
    this.router.navigate(['.'], {
      relativeTo: this._activatedRoute,
      queryParams: { id: ids },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  ChangeJSONEvent(queryParams) {
    if(queryParams.id) {
    queryParams = queryParams.id.split(',');
    this.JSONData.forEach(data => {
      if(queryParams.includes(data.id)) {
        data.isSelect = true;
      } else {
        data.isSelect = false;
      }
    });
    console.log(this.JSONData);
  }
  }
}
