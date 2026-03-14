import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './como-funciona.component.html'
})
export class ComoFuncionaComponent {
  onContactar(){
    console.log("Contactar");
  }
}