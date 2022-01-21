import { Page } from "playwright-core";

export default class ReusableComponents{

    private page:Page
    constructor(page:Page){
        this.page = page
    }

     async verifyElementText(locator: string, text: string): Promise<void> {
        //await this.waitForElementAttached(locator);
        const textValue = await this.page.textContent(locator);
        if(textValue!=null)
            expect(textValue.trim()).toBe(text);
    }

     async getText(ElementXpath : string): Promise<string> {
       return await page.$eval(ElementXpath, el => (el as HTMLInputElement).value);
         
    }

     async getSlotText(ElementXpath : string, newWindow : Page): Promise<string> {

        const slotText = await newWindow.locator(ElementXpath).innerText()
        return slotText

    }

    async  dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await page.waitForSelector(dragElementLocator);
        await page.waitForSelector(dropElementLocator);
        await page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    async sendInputFiles(selector: string, filePath: string){
        await page.setInputFiles(selector,filePath);
    }

    public waitForTimeout(timeout: any){
        return page.waitForTimeout(timeout)
    }

    async verifyElementNotVisible(selector: string){
        expect(await page.isVisible(selector)).toBeFalsy();
    }

    async verifyElementVisible(selector: string): Promise<boolean>{
        await page.waitForSelector(selector);
        return await page.isVisible(selector);
    }

    async verifyIsElementNotEnabled(selector: string){
        expect(await page.isEnabled(selector)).toBeFalsy();
    }

    async verifyListElements(locator: string, list: string[]){
        const Locator = await page.textContent(locator);
        expect(Locator).toEqual(list);
    }

    async getTextContent(selector: string){
        const value = await this.page.textContent(selector);
        console.log("The text content is : "+value);
        return value;
    }

    async verifyIsElementEnabled(selector: string){
        expect(await page.isEnabled(selector)).toBeTruthy();
    }

    async verifyIsElementUnChecked(selector: string){
        expect(await page.isChecked(selector)).toBeFalsy();
    }

    public stackReace(){
        var err = new Error();
        return err.stack;
    }

    async sownloadFile(loctor: string,reliableFilePath: string){
        const reliablePth = reliableFilePath;
        const [download] = await Promise.all([
            page.waitForEvent('download'),  // wait for download to start
            page.click(loctor)
        ]);
        //wait fror download to complete
        const path = await download.path();
        //save into the desired path
        await download.saveAs(reliableFilePath);
        console.log("The file is downloaded in path : "+path)
    }
}
