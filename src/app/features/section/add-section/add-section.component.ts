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
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { Section } from '@entities/section/model/section.model';
import { addSection } from '@entities/section/model/section.actions';

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
    isEditing: boolean = false;
    sectionName: FormControl = new FormControl('');
    @ViewChild('sectionNameInput') sectionNameInput!: ElementRef;

    private store = inject(Store<AppState>);

    constructor(private renderer: Renderer2) {}

    sectionForm = new FormGroup({
        sectionName: this.sectionName,
    });

    saveSection(): void {
        if (this.sectionForm.value.sectionName) {
            const newSection: Section = {
                id: crypto.randomUUID(),
                title: this.sectionForm.value.sectionName,
                tasks: [],
            };
            this.store.dispatch(addSection({ section: newSection }));
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
