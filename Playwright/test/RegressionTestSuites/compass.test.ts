import CompassLoginPage from "../../page/CompassLogin.page"
import BulkCreatePage from "../../page/BulkCreate.page"
import AdminPage from "../../page/Admin.page"

import * as loginData from "../../data/loginData.json"

declare const reporter:any;

describe('compass e2e testing', () => {

    let loginPg : CompassLoginPage
    let bulkCreatePg : BulkCreatePage
    let adminPg : AdminPage
    
    beforeEach(async() => {

        loginPg = new CompassLoginPage(page)
        bulkCreatePg = new BulkCreatePage(page, context)
        adminPg = new AdminPage(page)
       
    })

    test('TC_01 - Navigation to bulk create screen', async() =>{

        await loginPg.LaunchCompass(loginData.url)
        await reporter.startStep('Login to Compass')
        await loginPg.LoginToCompass(loginData.userId, loginData.password)
        await reporter.endStep()
        await bulkCreatePg.navigateToBulkCreate()
    })
 
    
})