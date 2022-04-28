App = {
    contracts: {},
    init: async () => {
        console.log('Loaded')
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        App.render()
        await App.renderVotes()
    },

    loadEthereum: async () => {
        if(window.ethereum) {
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else if (windows.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('No Ethereum browser is installed, please install Metamask')
        }
    },

    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]
        //console.log(accounts)
    },

    loadContracts: async () => {
        const res = await fetch("VotesContract.json")
        const votesContractJSON = await res.json()

        /*al objeto votesContract le pasamos el contrato desplegado(json) mediante truffle*/
        App.contracts.votesContract = TruffleContract(votesContractJSON)

        /*asignamos un proveedor al contrato mediante el proveedio por la web(el de metamask) para conectarnos*/
        App.contracts.votesContract.setProvider(App.web3Provider)

        /**ahora vamos a desplegar el contrato*/
        App.votesContract = await App.contracts.votesContract.deployed()
    },

    render: () => {
        document.getElementById('account').innerText = App.account
    },

    renderVotes: async () => {
        const voteCounter = await App.votesContract.counter()
        const voteCounterNumber = voteCounter.toNumber()

        for (let i = 1; i <= voteCounterNumber; i++) {
            const vote = await App.votesContract.votes(i)  
            console.log(vote)          
        }
    },

    doVote: async (fullname, option) => {
        const result = await App.votesContract.doVote(fullname, option, {
            from: App.account
        })
        console.log(result.logs[0].args)
    }
}