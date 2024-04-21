import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
    inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Section } from '@entities/section/model/section.model';
import { SectionFacade } from '@entities/section/model/section.facade';

@Component({
    selector: 'app-add-section',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
    ],
    templateUrl: './add-section.component.html',
    styleUrl: './add-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSectionComponent {
    @ViewChild('sectionNameInput') sectionNameInput!: ElementRef;

    isEditing: boolean = false;
    sectionName: FormControl = new FormControl('');
    private readonly sectionFacade = inject(SectionFacade);
    sectionForm = new FormGroup({
        sectionName: this.sectionName,
    });

    constructor(private renderer: Renderer2) {}

    saveSection(): void {
        if (this.sectionForm.value.sectionName) {
            const newSection: Section = {
                id: crypto.randomUUID(),
                title: this.sectionForm.value.sectionName,
                tasks: [],
            };
            this.sectionFacade.addSection(newSection);
        }
        this.cancelEditing();
    }

    startEditing(): void {
        this.isEditing = true;
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
