import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { Foto } from '../models/Foto.model';
import { ActionSheetController } from '@ionic/angular';
import { AiService } from '../services/ai.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public fotoService: FotoService,
    public actionSheetController: ActionSheetController,
    public aiService: AiService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.fotoService.carregarFotosSalvas();
  }

  public async showActionSheet(foto: Foto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [
        {
          text: 'Descrever a imagem',
          icon: 'eye',
          handler: () => {
            this.detalhesImagem(foto);

          }
        },
        {
          text: 'Itens na Imagem',
          icon: 'pricetags',
          handler: () => {
            this.detalhesImagem(foto);
          }
        },
        {
          text: 'Análise facial',
          icon: 'person-circle',
          handler: () => {
            this.detalhesImagem(foto);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.fotoService.deletePicture(foto, position);
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });
    await actionSheet.present();
  }

  async detalhesImagem(foto: Foto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const detalhes = await this.aiService.descreverImagem(await this.fotoService.getBlob(foto));
    console.log(detalhes);
    /*
        const modal = await this.modalController.create({
          component: AnalisePage,
          swipeToClose: true,
          componentProps: analise,
        });*/

    await loading.dismiss();
    // return await modal.present();
  }

}
