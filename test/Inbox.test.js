// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

const initialMessage = 'this is the initial message we are setting';
const newMessage = "this is the new message we are setting"

let from;
let inbox;

beforeEach(async () => {
    [from] = await web3.eth.getAccounts();
    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [initialMessage] })
        .send({ from, gas: '1000000' });
});


describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    })
    it('has a initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    })
    it('sets a new message', async () => {
        await inbox.methods.setMessage(newMessage).send({ from });
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);
    })
})

