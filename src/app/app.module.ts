import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Provider } from "@angular/core";

import { AppComponent } from "./app.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AuthInderceptor } from "./auth.interceptor";

const INTERCEPTER_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInderceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [INTERCEPTER_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
