App = {
    init: () => {
        console.log('Loaded')
        App.loadEthereum()
    },

    loadEthereum: async () => {
        if(window.ethereum) {
            App.web3Provider = window.ethereum
            await App.web3Provider.request({ method: 'eth_requestAccounts' })
        } else if (windows.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('No Ethereum browser is installed, please install Metamask')
        }
    }
}

App.init()