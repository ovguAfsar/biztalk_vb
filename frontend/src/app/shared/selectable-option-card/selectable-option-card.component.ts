import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selectable-option-card',
  standalone: true,
  templateUrl: './selectable-option-card.component.html',
  styleUrl: './selectable-option-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableOptionCardComponent {
  @Input({ required: true }) label = '';
  @Input() description = '';
  @Input({ required: true }) value = '';
  @Input() selected = false;
  @Input() disabled = false;

  @Output() selectedValue = new EventEmitter<string>();

  choose(): void {
    if (!this.disabled) {
      this.selectedValue.emit(this.value);
    }
  }
}

