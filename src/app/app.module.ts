import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SpeedTestComponent } from './components/speed-test/speed-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    SpeedTestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
