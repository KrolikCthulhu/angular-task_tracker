import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild,
    inject,
} from '@angular/core';
import { Section } from '../../entities/section/model/section.model';
import { DeleteSectionComponent } from '../../features/section/delete-section/delete-section.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SectionFacade } from '@entities/section/model/section.facade';

@Component({
    selector: 'app-section-card',
    standalone: true,
    templateUrl: './section-card.component.html',
    styleUrl: './section-card.component.scss',
    imports: [
        DeleteSectionComponent,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardComponent {
    @Input() section!: Section;
    @ViewChild('sectionNameInput') sectionNameInput!: ElementRef;
    isEditing: boolean = false;
    sectionName: FormControl = new FormControl('');
    private readonly sectionFacade = inject(SectionFacade);

    sectionForm = new FormGroup({
        sectionName: this.sectionName,
    });

    constructor(private renderer: Renderer2) {}

    saveSection(): void {
        if (
            this.sectionForm.value.sectionName &&
            this.sectionForm.value.sectionName !== this.section.title
        ) {
            this.sectionFacade.updateSectionTitle(
                this.section.id,
                this.sectionForm.value.sectionName
            );
        }
        this.cancelEditing();
    }

    startEditing(): void {
        this.isEditing = true;
        this.sectionName.setValue(this.section.title);
        this.sectionForm.get('sectionName')?.markAsTouched();
        setTimeout(() => {
            if (this.sectionNameInput) {
                this.renderer
                    .selectRootElement(this.sectionNameInput.nativeElement)
                    .focus();
            }
        });
    }

    cancelEditing(): void {
        this.isEditing = false;
        this.sectionName.reset();
    }
}
