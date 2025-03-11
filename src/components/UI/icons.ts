export enum IconNames {
    Email = "email",
    Add = "add",
    User = "user",
    Login = "login",
    Close = "close",
    Password = "password",
    OnPassword = "on-password",
    OffPassword = "off-password",
  }
  
export enum IconSizes {
    Normal = "normal",
    Large = "large",
}

const iconsPath: string  = "/src/assets/icons/";
const iconsFormat: string  = ".svg";

export default class MyUiIcons {
    public static getIconPath(iconName: IconNames): string{
        return iconsPath.concat(iconName, iconsFormat); //Path to icon
    }
}