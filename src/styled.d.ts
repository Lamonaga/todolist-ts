import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    app: {
      alignItems: string;
      width: string;
    };
    isOn: boolean;
  }
}
