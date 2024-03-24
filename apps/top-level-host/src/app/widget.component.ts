import {
    loadRemoteModule,
    LoadRemoteModuleOptions,
} from '@angular-architects/module-federation'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core'

@Component({
    selector: 'app-widget',
    template: ` <ng-container #placeHolder></ng-container> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent implements OnChanges {
    @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
    viewContainer!: ViewContainerRef

    @Input()
    mfUrl!: string

    private readonly changeDetectorRef = inject(ChangeDetectorRef)

    public async ngOnChanges(): Promise<void> {
        this.viewContainer.clear()

        try {
            if (!this.mfUrl) return

            const options: LoadRemoteModuleOptions = {
                type: 'module',
                remoteEntry: `${this.mfUrl}/remoteEntry.js`,
                exposedModule: './AppComponent',
            }

            const component = await loadRemoteModule(options).then((m) => {
                return m[Object.keys(m)[0]]
            })

            this.viewContainer?.createComponent(component)

            this.changeDetectorRef.markForCheck()
        } catch (error) {}
    }
}
