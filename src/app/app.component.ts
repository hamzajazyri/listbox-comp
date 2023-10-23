import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  libSelectControl = new FormControl('value 3');
  libSelectMultiControl = new FormControl([]);

  items = ['item1', 'item2'];


  popoverHtmlExample = `
    <h3>popover html<h3>
    <p style='font-size:13px;'>lroelmqs fmqsdf qsdfmlkqsdlf sqdfkl qsjflqs kdj</p>
  `;
}
