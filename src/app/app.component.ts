import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filterable-listbox';


  readonly items = Array.from({length: 100000}, (_, i) => `item #${i}`);


  onValueUpdate(val:any){
    console.log(val);
  }

}
