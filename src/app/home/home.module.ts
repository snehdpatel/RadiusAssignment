import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeService } from './home.service';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [
    HomeService,
    HttpService,
    AlertService,
    LoadingService,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
