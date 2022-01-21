import { Page } from "playwright-core";
declare const reporter:any;

export default class AdminPage{

    private page : Page

    private TitleTab = "//label[text()='Titles']"
    private Title = "//td[text()=' 801338 ']"
    private windows = "//div[text()='WINDOWS']"
    private overview = "//div[text()='OVERVIEW']"
    private cost = "//div[text()='COST']"
    private originals = "//div[@class='mat-form-field-infix ng-tns-c148-69']/input"    

    constructor(page:Page){
        this.page=page
    }

    async GotoTitle(){
        await this.page.click(this.TitleTab)
        await this.page.waitForTimeout(2000)
        await this.page.click(this.Title)
        await this.page.waitForTimeout(2000)
        await this.page.fill(this.originals, "30")
        await this.page.waitForTimeout(2000)
        await this.page.click(this.windows)
        await this.page.waitForTimeout(2000)
        await this.page.click(this.overview) 
        await this.page.waitForTimeout(2000)
    }

}