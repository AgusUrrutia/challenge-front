import { Injectable } from '@angular/core';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { Planta } from '../../interfaces/planta';
import { ModalComponent } from '../../shared/component/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: Dialog) { }

  openModal(planta: Planta): void {
    this.dialog.open(ModalComponent, {
      data: planta,
    });
  }
}
