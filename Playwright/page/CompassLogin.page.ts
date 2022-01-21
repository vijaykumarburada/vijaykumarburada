import { Page } from "playwright-core"
import ReusableComponents from "../utils/ReusableComponents"
declare const reporter:any;

let reusableComponents:ReusableComponents;

export default class CompassLoginPage{

    private page:Page
    private userId 
    private password 
    private submitBtn 
    private ssologin

    private ProfileMenu = "#profileMenu > button > span > span.fa.fa-angle-down.actDownArrow"
    private logOutBtn = "//*[@id='profileMenu']/ul/li[2]/a"
    private logOutYes = "//button[@id='logoutYes']"

constructor(page : Page){
        this.page = page
        this.userId = '#username'
        this.password='#password'
        this.submitBtn = '#submitBtn'
        this.ssologin = "//div[@class='modal-dialog']/div[1]//span/following::input[3]"
        reusableComponents = new ReusableComponents(this.page)
    }

    async LaunchCompass(url:string){
        await reporter.startStep("launch compass")
        await this.page.goto(url)
        await reporter.endStep()

    }

    /**
     * 
     * @param username Loginto Compass
     * @param password 
     */
    async LoginToCompass(username:string, password:string){

        await this.page.waitForSelector(this.ssologin)
        await this.page.click(this.ssologin)
      
        await reporter.addLabel("username", username)
        await reporter.startStep("Enter SSOID")
        await this.page.fill(this.userId, username)
        await reporter.endStep()

        await reporter.startStep("Enter Password")
        await this.page.fill(this.password, password)
        await reporter.endStep()

        reusableComponents.verifyElementText(this.submitBtn, "SIGN IN")

        await reporter.startStep("Click on Submit Button")
        
        await this.page.click(this.submitBtn)    
        await reporter.endStep()
   
    }

    /**
     * Logout
     */
    async logOut(){
        await reporter.startStep("logout from compass")
        await this.page.waitForSelector(this.ProfileMenu)
        await this.page.dblclick(this.ProfileMenu)
        await this.page.click(this.logOutBtn)
        await this.page.click(this.logOutYes)
        await reporter.endStep()
        await this.page.close()
    }

}
