import CompassLoginPage from "../../page/CompassLogin.page"
import SchedulePage from "../../page/Schedule.page"

import * as loginData from "../../data/loginData.json"
import * as schedulesData from "../../data/schedulesData.json"

declare const reporter:any;

describe('compass e2e testing', () => {

    let loginPg : CompassLoginPage
    let schedulesPg : SchedulePage

    beforeEach(async() => {

        loginPg = new CompassLoginPage(page)
        schedulesPg = new SchedulePage(page, context)
    })

    test('verify login and schedules functionality', async() =>{

        await reporter.description('compass login and schedules page functionality')
        await reporter.startStep('Login to Compass')
        await loginPg.LaunchCompass(loginData.url)
        await loginPg.LoginToCompass(loginData.userId, loginData.password)
        await reporter.endStep()

        await reporter.startStep('schedules page')
        await schedulesPg.createSchedule(schedulesData.addNetworks, schedulesData.removeNetworks, schedulesData.FromDate, schedulesData.FromTimeSlot, schedulesData.toDate, schedulesData.toTimeSlot)
        await reporter.endStep()
})
})