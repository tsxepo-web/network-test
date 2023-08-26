import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SpeedTestComponent } from './components/speed-test/speed-test.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    SpeedTestComponent,
    ClientInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
