import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListboxComponent } from './listbox/listbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibSelectComponent, LibSelectItemComponent } from './components/lib-select/lib-select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListboxComponent,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // comps
    LibSelectComponent,
    LibSelectItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
