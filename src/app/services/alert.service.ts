import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {

  private alert: HTMLIonAlertElement;

  constructor(private readonly alertCtrl: AlertController) { }

  public async show(title: string, message: string): Promise<HTMLIonAlertElement> {
    this.alert = await this.alertCtrl.create(
      {
        backdropDismiss: true,
        header: title,
        message,
      },
    );
    await this.alert.present();
    return this.alert;
  }
}
