import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListboxComponent } from './listbox/listbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CertificateEditorComponent } from './certificate-editor/certificate-editor.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListboxComponent,
    CertificateEditorComponent,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
