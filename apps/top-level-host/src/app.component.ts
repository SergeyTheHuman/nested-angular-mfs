import { NgStyle } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from '@nx-test/mf'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent, NgStyle],
    selector: 'app-root',
    template: `
        <div class="wrapper">
            <h1>top-level-host</h1>
            <app-dashboard
                [urls]="[
                    'http://localhost:4211',
                    'http://localhost:4212',
                    'http://localhost:4213'
                ]"
            />
        </div>
    `,
})
export class AppComponent {}
