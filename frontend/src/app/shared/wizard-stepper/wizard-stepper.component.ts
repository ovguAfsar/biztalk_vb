import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface WizardStep {
  number: number;
  label: string;
}

@Component({
  selector: 'app-wizard-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-stepper.component.html',
  styleUrl: './wizard-stepper.component.css'
})
export class WizardStepperComponent {
  @Input({ required: true }) currentStep = 1;

  protected readonly steps: WizardStep[] = [
    { number: 1, label: 'Kaynak Dosya' },
    { number: 2, label: 'Alan Eşleştirme' },
    { number: 3, label: 'Onay ve Kaydet' }
  ];

  protected getStepState(stepNumber: number): 'completed' | 'active' | 'upcoming' {
    if (stepNumber < this.currentStep) {
      return 'completed';
    }

    return stepNumber === this.currentStep ? 'active' : 'upcoming';
  }
}
