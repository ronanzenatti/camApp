import { Injectable } from '@angular/core';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Foto } from '../models/Foto.model';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  fotos: Foto[] = [];

  constructor() {}

  public async tirarFoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.fotos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath,
    });
  }
}
