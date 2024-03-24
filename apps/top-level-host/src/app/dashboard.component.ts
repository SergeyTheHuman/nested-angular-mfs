import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { WidgetComponent } from 'apps/top-level-host/src/app/widget.component'
import { Observable, delay, of } from 'rxjs'

@Component({
    selector: 'app-dashboard',
    template: `
        @for (mfUrl of mfUrls$ | async; track mfUrl) {
        <app-widget [mfUrl]="mfUrl" />
        }
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, WidgetComponent],
})
export class DashboardComponent {
    public readonly mfUrls$: Observable<string[]> = of([
        'http://localhost:4211',
        'http://localhost:4212',
        'http://localhost:4213',
    ]).pipe(delay(1000))
}
