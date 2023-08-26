import { Component, OnInit, Type } from '@angular/core';
import { BackendService } from 'src/app/services/Backend/backend.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  historicalData: any[] = [];
  date: any[] = [];
  uploadSpeed: number[] = [];
  downloadSpeed: number[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    this.backendService.getHistoricalData(userId).subscribe(
      data => {
        this.historicalData = data;
        console.log(this.historicalData);
      }
    );
  }

  public lineChartData = [{
    data: this.historicalData.map(up => up.uploadSpeed),
    label: 'uploads', backgroundColor: 'blue'
  }];

  public lineChartLabels = this.historicalData.map((d) => d.date);
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            day: 'MMM D'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgb(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };
  public lineChartType: ChartType = 'line';
}