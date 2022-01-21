import { Page } from "playwright-core"

export default class ReusableFunctions{

        private page:Page
        private selectedNetworkXpath = "//div[@id='selectedNetworksLogoBox1']//li//img[@title='##networkname##']"
        private unselectedNetworkXpath = "//div[@id='unSelectedNetworksLogoBox1']//li//img[@title='##networkname##']"
        private selectedNetworksListXpath = "//div[@id='selectedNetworksLogoBox1']//li//img"
     
        constructor(page:Page){
            this.page=page
        }


        async addNetwork(networkName:string){

            let defaultNetwork = await this.page.locator(this.selectedNetworksListXpath).getAttribute("title")
            const newNetworkXpath = this.replacedXpath(this.unselectedNetworkXpath, '##networkname##', networkName)
            if(await this.page.locator(this.replacedXpath(this.selectedNetworkXpath, '##networkname##', networkName)).isVisible()){
                console.log("network is already present")
            }
            else{
                try {
                    await this.page.click(newNetworkXpath)
                    const selectedNetworksList = await this.page.$$(this.selectedNetworksListXpath)
                    if(selectedNetworksList.length>1){
                        await this.page.click(this.replacedXpath(this.selectedNetworkXpath, '##networkname##', defaultNetwork))
                    }
                    console.log(networkName + " is selected")
                } catch (error) {
                    console.log("cannot add network")  
                }  
            } 
            
        }

        async removeNetwork(networkName:string){
            const selectedNetworksList = await this.page.$$(this.selectedNetworksListXpath)
            if(selectedNetworksList.length==1){

                const presentNetworkName = await selectedNetworksList[0].getAttribute("title")
                if(presentNetworkName===networkName){
                console.log("cannot remove network - atleast one network should be present")
                }
                else{
                    console.log("network to be removed is not present")
                }
            }
            else{
                try {  
                    const newXpath = this.replacedXpath(this.selectedNetworkXpath, '##networkname##', networkName)
                    await this.page.click(newXpath)

                } catch (error) {
                    console.log("unable to remove network")        
                }
            }

        }

    replacedXpath(strXpath : string, strDynamicText : string, strReplacedText : any) : string
    {   
        var tempXpath = strXpath
        tempXpath = tempXpath.replace(strDynamicText, strReplacedText)
        
        return tempXpath
    }

    async smallWait(){
        await this.page.waitForTimeout(3000)
    }

    async mediumWait(){
        await this.page.waitForTimeout(8000)
    }

    async largeWait(){
        await this.page.waitForTimeout(20000)
    }
   
}