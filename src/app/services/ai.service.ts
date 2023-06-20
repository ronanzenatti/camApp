import { Injectable } from '@angular/core';
import { Foto } from '../models/Foto.model';
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private APIKEY = '8eb4830e2c1e4cceb125f1154c639018';
  private ENDPOINT = 'https://ai-ionic.cognitiveservices.azure.com/';

  constructor() { }

  async descreverImagem(foto: Blob) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(this.APIKEY);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, this.ENDPOINT);

    return await client.describeImageInStream(foto, { language: 'pt' }).then(retorno => {
      console.log('Descrever Imagem: ', retorno);

      return {
        descricao: retorno.captions ? retorno.captions[0].text : "",
        confianca: retorno.captions ? retorno.captions[0].confidence : "",
        tags: retorno.tags ? retorno.tags : []
      }
    });
  }


}
