import { BrowserContext, Page } from "playwright-core"
import ReusableComponents from "../utils/ReusableComponents"
import ReportUtils from "../utils/ReportUtils"
declare const reporter:any;

//removed master page instance
let DefaultSchedule:string;
let ExistingDuration:string;

let reusableComponents: ReusableComponents;
export default class BulkCreatePage{

    
    private page:Page
    private context: BrowserContext

    private SchedulesTab = '#mainNavTabs > li:nth-child(6) > a >span:nth-child(2)'
    private TitlesTab = "#mainNavTabs > li:nth-child(4) > a >span:nth-child(2)"//new
    private BulkCreate = '#subTabNav > li:nth-child(3) > a'
    private ScheduleList = '#subTabNav > li:nth-child(4) > a'

    private FeedDropDown = "//select[@id='bulk_feed']"
    private ScheduleDropDown = "//*[@id='bulkCreateScheduleDropDown']//div[@class='btn-group']"
    private ScheduleOption = "//a[contains(text(), ' ##schedule## ')]/span"
    private BulkMasterSeries = "//span[@aria-controls='bulk_masterSeries_listbox']"
    private BulkMasterSeriesOptions = "//ul[@id='bulk_masterSeries_listbox']//li[contains(text(), '##BulkMasterSeries##')]"
    private StartDateInput = "#startDate"
    private endDateInput ='#endDate'
    private WeekNumberInput = "//input[@id='weekNumber']"
    private BulkProgramType = "//select[@id='bulk_programType']"
    
    private StartTimeList = "span[aria-controls='startTime_timeview'] >span"
    private StartTime = "//ul[@id = 'startTime_timeview'][@aria-hidden='false']/li[text() = '##StartTime##']"
    private StartTimeInput = '#startTime'
    private endTimeList = "//span[@aria-controls='endTime_timeview']/span"
    private endTime = "//ul[@id = 'endTime_timeview'][@aria-hidden='false']/li[text() = '##endTime##']"
    private DurationInput = "//input[@id='duration']"
    private GoButton = 'div[class="pull-right marginTopN5"] button.commonBtn.pull-right'
    
    private AiringsList = "//div[@class='bulkCreateGrid bulkCreateFixedGrid']//div[@class='k-grid-content k-auto-scrollable']/table"
    
    private checkOutLabel = "//div[@class='bulkCreateHintWrap']/div"//new
    private SchedulePopUpOkBtn = "//button[@id='lockedSchedulePopupOK']"
    private SchedulePopUpCancelBtn = "//button[@id='lockedSchedulePopupCancel']"
    private SchedulePopUp = "//div[@id='lockedSchedulePopup']"
    private SchedulePopUpContent = "//div[@id='lockedSchedulePopup']//div[@class='kendoContent']"//new
    private PopUpOkBtn = "#popupOK"
    private PopUpCancelBtn = "#popupCancel"//add #
    private commonPopUp = "//div[@id='commonPopup']"//new
    //private CommonPopUp = 'div#commonPopup >div:nth-child(3) > button.commonBtn'
    private AiringsOkBtn = '#airingsDatarangePopupOk'

    //new
    private UnsavedDataCancelBtn = "//button[@id='unsavedDataDialogCancel']"
    private UnsavedDataOkBtn = "//button[@id='unsavedDataDialogYes']"
    private UnsavedDataPopUp = "//div[@id='unsavedDataDialog']"
    private scheduleListLabel = "//ol/li[2]"
    private serchTitles = "//div[@class='d2c-search-header-col d2c-search-bar']/input"
    
    //airing
    private Airing = "//div[@class='bulkCreateGrid bulkCreateFixedGrid']//div[@class='k-grid-content k-auto-scrollable']/table//tr[1]"
    private AsianClientsCell = "//tr[1]/td[@data-title='Asian Clients']"
    private AsianClientsDropDownIcon = "//td[@data-title='Asian Clients']//span[@class='k-icon k-i-arrow-60-down']"
    private AsianClientsOptions = "//ul[@class='k-list k-reset']//li[text()='##AsianClients##']"
    private ClientsCell = "//tr[1]/td[@data-title='Clients']"
    private ClientsInput = "//tr[1]/td[@data-title='Clients']/div/div/input"
    
    //new
    private FormatCell = "//tr[1]/td[@data-title='Format']"
    private FormatCellDropDownIcon = "//td[@data-title='Format']//span[@class='k-icon k-i-arrow-60-down']"
    private FormatCellTypeValue = "(//ul/li[text()='##FormatName##'])[2]"
    private AiringSchedulingTypeCell  = "//tr[1]/td[@data-title='Scheduling Type']"
    private AiringSchedulingTypeDropDownIcon = "//td[@data-title='Scheduling Type']//span[@class='k-icon k-i-arrow-60-down']"
    private AiringSchedulingTypeValue = "//ul/li[text()='##AiringSchedulingType##']"
    private ScheduleInstructionsCell = "//tr[1]/td[@data-title='Schedule Instructions']"
    private ScheduleInstructionsDropDownIcon = "//td[@data-title='Schedule Instructions']//span[@class='k-icon k-i-arrow-60-down']"
    private ScheduleInstructionsTypeValue = "//ul/li[text()='##ScheduleInstructions##']"
    private BlackoutCheckbox = "//tr[1]/td[@data-title='Blackout']/input"

    //validate and save
    private ValidateLink = "//div[@class='pull-right marginTop4px pad0Imp']/a[text()='Validate']"
    private ValidatePopUpOKBtn = "//button[@id='okbuttonpopup']"
    private TopRightSaveBtn = "//ul[@class='topBredcrumMenu pull-right']//a[text()='SAVE']"
    private SaveWarningPopupOk = "#saveWarningPopupOk"
    private ConflicPopUp = "#openConflictPopup"
    private ConflictCloseBtn = "#conflictGridClose"
    private ConflictOkBtn = "#conflictGridOk"

    //DES
    private DES_Checkbox = "//label[text()='DES']"
    private SD_Delivery = "//*[@id='bulk_sdDelivery']"
    private HD_Delivery = "//*[@id='bulk_hdDelivery']"

    //TVE
    private bulkTveStatus = "//select[@id='bulk_tveStatus']"//new

    //Downlink
    private SchedulingTypeDrpDwn = "//select[@id='bulk_scheduleType']"
    private DownlinkCheckbox = "//label[text()='Downlink']"
    private DownlinkDateCell = "//tr[1]/td[@data-title='Downlink Date']"
    private DownlinkDateEdit = "//input[@id='downlinkDateEdit']"
   // private Dow
    private DownlinkDurationCell = "//tr[1]/td[@data-title='Downlink Duration']"
    private DownlinkFlag = "//tr[1]//input[@id='downlinkFlag']"

    private SLGoButton = "//div[@class='pull-right marginTopN5']/button[@class='commonBtn']"
    
    private dropdownPref = "//div[text()='Preferences']//following-sibling::div/select"
    
    //Preferences Add
    private addPreference_btn = "//a[text()='ADD']";
    private addPreference_popup = "//h4[text()='Add Preferences']";
    private addPreference_txt =  "//input[@class='preferenceName']";
    private btnPreference = "//button[@id='okPreferences']";
    private btnCancelPref = "//button[@id='cancelPreferences']";
    //Preferenced Edit
    private editPreference_btn = "//a[text()='EDIT']";
    private editPreference_popup = "//h4[text()='Edit Preferences']";
    private deletepreference_btn = "//a[text()='DELETE']";
    private deletepreference_popup = "//div[@id='clearPreferencesPopup']"
    private deletepreference_okbtn = "//button[@id='preferencesPopupOK']";
    //Pref Drag and drop 
    private dragBlock ="div[id='kgrid'] th[data-field='blockDuration']";
    private dropBlock ="div[id='kgrid'] th[data-field='scheduleName']";
    private prefSave = "//div[@class='pull-left marginTop4px']//a[text()='SAVE']";

    //episodes xpath's
    private ContextMenuRow = 'table span.contextMenuRow'
    private ApplyEpisodes = "//*[@id='contextMenuRow']/li[2]/span"
    private MasterSeriesListBox = "//*[@id='divMaster']/span/span/span[2]/span"
    private MasterSeries = "//ul[@id = 'master_Series_listbox']//li[text() = '##MasterSeries##']"
    private MasterSeriesInput = "//div[@id='divMaster']/span/span/input"
    private ProgramTypeDropDown = "div[class='row kendoPopUpGridCollection KendoGridPopupApplyEpisode'] select"
    private SeasonDropDown = "(//div[@class='row kendoPopUpGridCollection KendoGridPopupApplyEpisode']//select)[2]"
    
    private SearchBtn  = '.popupFormInputsWrap button.commonBtn'
    private CloseBtn = "//span[@class='k-icon k-i-close']"

constructor(page : Page, context : BrowserContext){
        this.page = page
        this.context = context
        reusableComponents = new ReusableComponents(this.page)
    }
/**
 * navigates to bulk create page
 */
    async navigateToBulkCreate(){
        await reporter.startStep("click on schedules tab")
        await  this.page.click(this.SchedulesTab)
        await reporter.endStep()
        await reporter.startStep("click on Bulk Create")
        await  this.page.click(this.BulkCreate)
        await reporter.endStep()
        await ReportUtils.attachScreenshot("Bulk Create page")//should change to report utils
    }
    
}
