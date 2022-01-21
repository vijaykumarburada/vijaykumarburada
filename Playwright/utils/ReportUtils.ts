import { Page } from "playwright-core";

declare const reporter: any;
export default class ReportUtils{

public static async attachScreenshot(description?: string) {
    const screenshotBuffer = await page.screenshot( {fullPage: true} );
    description = description != undefined ? description : "screenshot";
    await reporter.addAttachment(description, screenshotBuffer, "image/png");
   // await reporter.endStep() - commented
}

public static async attachScreenshotNewWindow( newWindow : Page, description?: string) {
    const screenshotBuffer = await newWindow.screenshot( {fullPage: true} );
    description = description != undefined ? description : "screenshot";
    await reporter.addAttachment(description, screenshotBuffer, "image/png");
}


}
    