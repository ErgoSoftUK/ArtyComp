import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { AppRoot } from './app-root';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import { MortarRangeComponent } from './mortar-range/mortar-range.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatReadonlyDirective} from './mat-readonly.directive';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        RouterModule.forRoot([
                {path: '', component: MortarRangeComponent}
            ],
            {useHash: true}),
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FlexModule,
        MatSelectModule,
        MatDividerModule
    ],
  providers: [
  ],
  declarations: [AppRoot, MortarRangeComponent, MatReadonlyDirective],
  bootstrap: [AppRoot],
})
export class AppModule { }
