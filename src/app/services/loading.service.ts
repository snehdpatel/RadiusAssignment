import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SpinnerTypes } from '@ionic/core';

@Injectable()
export class LoadingService {
  private loadingElement: HTMLIonLoadingElement;

  constructor(private readonly loadingController: LoadingController) { }

  public async createLoadingIndicator(description?: string, icon?: SpinnerTypes) {
    this.loadingElement = await this.loadingController.create();
    this.loadingElement.message = description === undefined ? 'Please wait' : description;
    this.loadingElement.spinner = icon === undefined ? 'crescent' : icon;
  }

  public async dismissLoadingIndicator() {
    if (this.loadingElement !== undefined) {
      await this.loadingElement.dismiss();
    }
  }

  public async presentLoadingIndicator() {
    await this.loadingElement.present();
  }
}
