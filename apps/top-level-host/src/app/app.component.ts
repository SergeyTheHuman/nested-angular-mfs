import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from 'apps/top-level-host/src/app/dashboard.component'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent],
    selector: 'app-root',
    template: `
        <h1>Welcome top-level-host</h1>
        <app-dashboard />
    `,
})
export class AppComponent {}
