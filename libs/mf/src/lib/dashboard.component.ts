import { AsyncPipe, NgClass } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { WidgetComponent } from 'libs/mf/src/lib/widget.component'
import { delay } from 'rxjs'

@Component({
    selector: 'app-dashboard',
    template: `
        <div [class.dashboard]="mfUrlsNotEmpty()">
            @for (mfUrl of mfUrls(); track mfUrl) {
            <app-widget [mfUrl]="mfUrl" />
            }
        </div>
    `,
    styles: `
    .dashboard {
      display: grid;
      margin-top: 16px;
      gap: 16px;
      border-radius: 16px;
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, NgClass, WidgetComponent],
})
export class DashboardComponent {
    urls = input.required<string[]>({ alias: 'urls' })

    public readonly mfUrls = toSignal(toObservable(this.urls).pipe(delay(1000)))

    public readonly mfUrlsNotEmpty = computed(() => !!this.mfUrls()?.length)
}
