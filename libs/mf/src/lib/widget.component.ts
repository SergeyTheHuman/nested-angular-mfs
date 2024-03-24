import { loadRemoteModule } from '@angular-architects/module-federation'
import { NgStyle } from '@angular/common'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    input,
    OnChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core'
import { getRandomHexColor } from './random-hex-generator'

@Component({
    selector: 'app-widget',
    template: `
        <div
            class="mf"
            [ngStyle]="{ backgroundColor: color }"
        >
            <ng-container #placeHolder />
        </div>
    `,
    styles: `
    .mf {
      padding: 16px;
      border-radius: 16px;
    }
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgStyle],
})
export class WidgetComponent implements OnChanges {
    @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
    viewContainer!: ViewContainerRef

    mfUrl = input.required<string>()

    private readonly changeDetectorRef = inject(ChangeDetectorRef)

    public color = getRandomHexColor()

    public async ngOnChanges(): Promise<void> {
        this.viewContainer.clear()

        try {
            if (!this.mfUrl()) return

            this.viewContainer?.createComponent(
                await loadRemoteModule({
                    type: 'module',
                    remoteEntry: `${this.mfUrl()}/remoteEntry.js`,
                    exposedModule: './AppComponent',
                }).then((m) => m[Object.keys(m)[0]]),
            )

            this.changeDetectorRef.markForCheck()
        } catch (error) {}
    }
}
