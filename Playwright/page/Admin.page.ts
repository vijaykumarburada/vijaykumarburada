import { Page } from "playwright-core";
declare const reporter:any;

export default class AdminPage{

    private page : Page

    private AdminTab = "#mainNavTabs > li:nth-child(13) > a >span:nth-child(2)"
    private FormatSubTab = "//li[@id='/AdminManagement/AdminFormat']"
    private network = "//select[@id='formatSearchNetwork']"
    private addFormatLink = "//a[@class='commonLinkNormal']"
    private FormatNameCell = "//span[@id='showFormatName']"
    private FormatNameInput = "//input[@id='formatNameEditorCheck']"
    private FormatSaveOkBtn = "#formatSearchYes"
    private SaveBtn = "//a[@class='commonLinkNormal fontWeightBold']"
    private searchBtn = "//button[text()='SEARCH']"

    constructor(page:Page){
        this.page=page
    }

    async addFormat(Network:string, formatName:string):Promise<string>{
        await this.page.click(this.AdminTab)
        await reporter.startStep("navigated to Admins tab")
        await reporter.endStep()
        await this.page.click(this.FormatSubTab)
        await this.page.selectOption(this.network, {label:Network})
        await this.page.click(this.addFormatLink)
        await this.page.click(this.FormatNameCell)
        let date = new Date()
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        formatName = formatName +"_"+ date.getDate() + "/" + date.getMonth()+ "/" + date.getFullYear() + "_" + time
        await this.page.fill(this.FormatNameInput, formatName)
        await reporter.startStep("entered format name - " + formatName)
        await reporter.endStep()
        await this.page.click(this.searchBtn)
        await this.page.click(this.FormatSaveOkBtn)
        return formatName
    }

}