import CompassLoginPage from "../../page/CompassLogin.page"
import SchedulePage from "../../page/Schedule.page"
import TitlePage from "../../page/Titles.page"

import * as loginData from "../../data/loginData.json"
import * as schedulesData from "../../data/schedulesData.json"


declare const reporter:any;

describe('compass staging e2e testing', () => {

    let loginPg : CompassLoginPage
    let schedulesPg : SchedulePage
    let titlePg : TitlePage
    

    beforeEach(async() => {

        loginPg = new CompassLoginPage(page)
        schedulesPg = new SchedulePage(page, context)
        titlePg = new TitlePage(page)
    })                                                                               

    test('verify login and titles functionality', async() =>{

        await reporter.description('compass staging login and Titles page functionality')
        await reporter.startStep('Login to Compass Staging')
        await loginPg.LaunchCompass(loginData.url)
        await loginPg.LoginToCompass(loginData.userId, loginData.password)
        await titlePg.GotoTitle()
       

    
})
})