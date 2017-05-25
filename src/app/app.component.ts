import { Component } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { BannerService } from '@cmuh/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(public bannerService: BannerService,
    public domSanitizer: DomSanitizer) {
  }

  private safeHtml(htmlString) {
    return htmlString ? this.domSanitizer.bypassSecurityTrustHtml(htmlString) : 'Banner Service 顯示的地方，可註解';
  }
}
