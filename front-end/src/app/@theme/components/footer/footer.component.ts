import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by"> </span>
    <div class="socials">
      <a
        href="https://github.com/masoudsadeghiDev"
        target="https://github.com/masoudsadeghiDev"
        class="ion ion-social-github"
      ></a>
      <a
        href="https://twitter.com/MasoudS48092071"
        target="_blank"
        class="ion ion-social-twitter"
      ></a>
      <a
        href="https://linkedin.com/in/masoud-sadeghi-dev"
        target="linkedin.com/in/masoud-sadeghi-dev"
        class="ion ion-social-linkedin"
      ></a>
    </div>
  `,
})
export class FooterComponent {}
