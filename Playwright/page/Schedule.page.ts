import { BrowserContext, Page } from "playwright-core"
import ReusableFunctions  from "../utils/ReusableFunctions"
import ReusableComponents from "../utils/ReusableComponents"
import ReportUtils from "../utils/ReportUtils"
declare const reporter:any;

let reusableFunctions : ReusableFunctions;
let reusableComponents:ReusableComponents;
export default class SchedulePage{

    private page:Page
    private context: BrowserContext

    private SchedulesTab = '#mainNavTabs > li:nth-child(6) > a >span:nth-child(2)'
    private Schedule = '#subTabNav > li:nth-child(1) > a'
    private tableElement = '#KendoGridView > div.k-grid-content.k-auto-scrollable > table > tbody > tr'
    private OpenBtn = "//a[@id='openButton']"
    private scheduleSlot = "//div[@data-date='##date##']//div[@data-timeslot='##timeSlot##']/div"
    private droppedSlotXpath = "//div[@data-date='##date##']//div[@data-timeslot='##timeSlot##']//span"
    private OkBtn = "#lockAndRelockdialogOK"

    constructor(page : Page, context : BrowserContext){
        this.page = page
        this.context = context
        
    }

    async createSchedule(addNetworks:string[], removeNetworks:string[], fromDateValue:string, fromTimeSlotValue:string, toDateValue:string, toTimeSlotValue:string){
        await reporter.startStep("click on schedules tab")
        await this.page.click(this.SchedulesTab)
        await reporter.endStep()

        await reporter.startStep("click on schedules")
        await this.page.click(this.Schedule)
        await reporter.endStep()
    }

}
