import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from '@nx-test/mf'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent],
    selector: 'app-root',
    template: `
        <div class="wrapper">
            <h1>level-three-mf-2</h1>
            <app-dashboard
                [urls]="[
                    'http://localhost:4241',
                    'http://localhost:4242',
                    'http://localhost:4243'
                ]"
            />
        </div>
    `,
})
export class AppComponent {}
