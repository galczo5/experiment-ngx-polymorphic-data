import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FullNameComponent} from './full-name.component';
import {PriceDollarsComponent} from './price-dollars.component';
import {PriceEuroComponent} from './price-euro.component';
import {ProgressComponent} from './progress.component';
import {createPolymorphicData, NgxPolymorphicDataModule,} from 'ngx-polymorphic-data';

@NgModule({
  declarations: [
    AppComponent,
    FullNameComponent,
    PriceDollarsComponent,
    PriceEuroComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    NgxPolymorphicDataModule.forComponents(
      createPolymorphicData(FullNameComponent, { type: 'fullName' }),
      createPolymorphicData(PriceDollarsComponent, { currency: 'dollar' }),
      createPolymorphicData(PriceEuroComponent, { currency: 'euro' }),
      createPolymorphicData(ProgressComponent, (data) => data.type === 'progress')
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
