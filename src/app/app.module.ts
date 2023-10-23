import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibSelectComponent, LibSelectItemComponent } from './components/lib-select/lib-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibMultiSelectComponent } from './components/lib-multi-select/lib-multi-select.component';
import { LibDropdownComponent, LibDropdownMenuItemComponent } from './components/lib-dropdown/lib-dropdown.component';
import { LibTooltipDirective } from './components/lib-tooltip/lib-tooltip.directive';
import { LibPopoverDirective } from './components/lib-popover/lib-popover.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // comps
    LibSelectComponent,
    LibSelectItemComponent,
    LibMultiSelectComponent,
    ///
    LibDropdownComponent,
    LibDropdownMenuItemComponent,
    ///
    LibTooltipDirective,
    LibPopoverDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
