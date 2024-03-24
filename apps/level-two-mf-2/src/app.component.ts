import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from '@nx-test/mf'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent],
    selector: 'app-root',
    template: `
        <div class="wrapper">
            <h1>level-two-mf-2</h1>
            <app-dashboard
                [urls]="['http://localhost:4231', 'http://localhost:4232']"
            />
        </div>
    `,
})
export class AppComponent {}
