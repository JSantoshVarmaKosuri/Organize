import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrganizeDrawComponent } from "./org.organize.draw.component";

const routes: Routes = [
    { path: 'draw', component: OrganizeDrawComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizeDrawRouter {

}