import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
  selector: 'app-tag-with-popover',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './tag-with-popover.component.html',
  styleUrls: ['./tag-with-popover.component.scss']
})
export class TagWithPopoverComponent implements OnInit {
  @Input() text: string = '';
  @Input() icon: any;
  @Input() proficiency: string | number = 0;
  @Input() level?: string;

  showPopover: boolean = false;
  private translatePipe = inject(TranslatePipe);

  constructor() { }

  ngOnInit(): void {
  }

  getProficiencyValue(): number {
    if (typeof this.proficiency === 'string') {
      return parseFloat(this.proficiency.replace(/[^\d.-]/g, ''));
    }
    return this.proficiency;
  }

  getProficiencyLabel(): string {
    const value = this.getProficiencyValue();
    if (value >= 90) {
      return this.translatePipe.transform('advancedLevel');
    } else if (value >= 70) {
      return this.translatePipe.transform('intermediateLevel');
    } else if (value >= 40) {
      return this.translatePipe.transform('basicLevel');
    } else {
      return this.translatePipe.transform('basicLevel'); // Ajustei para basicLevel, já que não existe beginnerLevel
    }
  }

  onMouseEnter(): void {
    this.showPopover = true;
  }

  onMouseLeave(): void {
    this.showPopover = false;
  }
}
