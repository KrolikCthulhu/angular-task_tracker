import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SectionActions from './section.actions';
import { SectionService } from '../api/section.service';

@Injectable()
export class SectionEffects {
    private sectionService = inject(SectionService);
    private actions$ = inject(Actions);

    constructor() {}

    addSection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SectionActions.addSection),
            mergeMap((action) =>
                this.sectionService.addSection(action.section).pipe(
                    map((section) =>
                        SectionActions.addSectionSuccess({ section })
                    ),
                    catchError((error) =>
                        of(SectionActions.addSectionFailure({ error }))
                    )
                )
            )
        )
    );

    loadSections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SectionActions.loadSections),
            mergeMap(() =>
                this.sectionService.getSections().pipe(
                    map((sections) =>
                        SectionActions.loadSectionsSuccess({ sections })
                    ),
                    catchError((error) =>
                        of(SectionActions.loadSectionsFailure({ error }))
                    )
                )
            )
        )
    );

    deleteSection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SectionActions.deleteSection),
            mergeMap(({ id }) =>
                this.sectionService.deleteSection(id).pipe(
                    map(() => SectionActions.deleteSectionSuccess({ id })),
                    catchError((error) =>
                        of(SectionActions.deleteSectionFailure({ error }))
                    )
                )
            )
        )
    );
}
