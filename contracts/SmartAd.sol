pragma solidity ^0.4.15;

contract SmartAd {

    /***************************
     * Constatns/Variables
    ***************************/
    uint constant FRACTION_ADVERTISER = 100000;
    uint constant FRACTION_VIEWER     = 1000000;
    string constant DEFAULT_NAME      = "Default campaign name";

    /*
     * Marketing Campaign
    **/
    struct Campaign {
        address owner;
        bool active;
        string name;
        uint balance;
        uint advDividends;
        mapping(address => Publisher) publishers;
    }

    /*
     * Publisher participating in Campaign
    **/
    struct Publisher {
        address owner;
        uint dividends;
        bool onboarded;
        address[] clients;
    }

    /*
     * Advertisment slot created by Publishers
    **/
    struct AdSlot {
        address owner;
        bool active;
        string name;
    }

    Campaign[] public campaigns;
    AdSlot[] public adSlots;
    /***************************
     * Mapping
    ***************************/
    mapping(address => uint[]) publishersWork;

    /***************************
     * Validation
    ***************************/
    modifier activeCampaign(uint id) {
        require(campaigns[id].active == true);
        _;
    }

    modifier canPayoutViewer(uint id) {
        require(campaigns[id].balance >= FRACTION_VIEWER);
        _;
    }

    modifier canPayoutAdv(uint id) {
        require(campaigns[id].balance >= campaigns[id].advDividends);
        _;
    }

    modifier ownerOnly(uint id) {
        require(campaigns[id].owner == msg.sender);
        _;
    }

    modifier publisherOnly(uint id) {
        require(campaigns[id].publishers[msg.sender].owner == msg.sender);
        _;
    }

    modifier enoughFunds(uint id, uint withdrawAmount) {
        require(campaigns[id].balance >= withdrawAmount);
        _;
    }

    /***************************
     * Initializers
    ***************************/
    /// Method to initialzie a marketing campaign triggered by
    /// advertiser
    function initializeCampaign(string cname, uint payAdvertiser)
             public
             payable
             returns(uint) {
        // Push new campaign to the array of campaigns
        Campaign memory newCampaign;
        newCampaign.owner   = msg.sender;
        newCampaign.active  = true;
        newCampaign.name    = bytes(cname).length != 0 ? cname : DEFAULT_NAME;
        newCampaign.balance = msg.value;
        newCampaign.advDividends = payAdvertiser != 0 ? payAdvertiser : FRACTION_ADVERTISER;
        campaigns.push(newCampaign);
        // Return the amount of campaigns
        return campaigns.length;
    }

    /// Method to initialzie a slot available for advertisers to view
    /// and contact publishers
    function initialzieAdSlot(string cname)
             public
             returns(uint) {
        AdSlot memory newAdSlot;
        newAdSlot.owner = msg.sender;
        newAdSlot.active = true;
        newAdSlot.name = cname;
        adSlots.push(newAdSlot);
        // Return the amount of Ad Slots
        return adSlots.length;
    }

    /***************************
     * Methods
    ***************************/
    /// Method to register a view by client and pay out a fraction of
    /// fund to a publisher for hosting the add & code that runs it
    function adClick(uint id)
             public
             activeCampaign(id)
             canPayoutAdv(id) {
        // Add funds to advertiser dividends under a certain campaign
        campaigns[id].balance -= campaigns[id].advDividends;
        campaigns[id].publishers[msg.sender].dividends += campaigns[id].advDividends;
    }

    /// Method that pays out funds to owner of publisher in a specific campaign
    function getAdvertiserPayout(uint id)
             public
             publisherOnly(id) {
        // Transfer money to publisher
        campaigns[id].publishers[msg.sender].owner.transfer(campaigns[id].publishers[msg.sender].dividends);
        // Flush current dividends balance
        campaigns[id].publishers[msg.sender].dividends = 0;
    }

    /// Method to register am emgagement by client and pay out a fraction of
    /// fund to a client interacting with add
    /*
    function adInteraction(uint id, address viewer)
             public
             activeCampaign(id)
             canPayoutViewer(id)
             payable {
        // Payout funds to publisher
        campaigns[id].balance -= FRACTION_VIEWER;
        viewer.transfer(FRACTION_VIEWER);
    }
    */

    /// Method to onboard publisher, executed by publisher
    function onboardPublisher(uint[] id)
             public {
        // Onboard the publisher by iterating thru all selected campaigns to join
        for (uint i = 0; i < id.length; i++) {
            campaigns[id[i]].publishers[msg.sender].onboarded = true;
            campaigns[id[i]].publishers[msg.sender].owner = msg.sender;
            publishersWork[msg.sender].push(id[i]);
        }
    }

    /// Method to offboard publisher, executed by publisher
    function offboardPublisher(uint[] id)
             public {
        // Onboard the publisher by iterating thru all selected campaigns to join
        for (uint i = 0; i < id.length; i++) {
            campaigns[id[i]].publishers[msg.sender].onboarded = false;
            delete campaigns[id[i]].publishers[msg.sender];
        }
    }

    /// Method to withdraw funds from the contract [OWNER]
    function withdrawCampaignFunds(uint id, uint withdrawAmount)
             public
             ownerOnly(id)
             enoughFunds(id, withdrawAmount)
             returns (uint) {
        // Withdraw funds from balance
        campaigns[id].balance -= withdrawAmount;
        // Transfer funds to owner of the campaign
        campaigns[id].owner.transfer(withdrawAmount);
        // Return whats left on the balance of the contract
        return campaigns[id].balance;
    }

    /// Method to add funds to the contract
    function addCampaignFunds(uint id)
             public
             payable
             returns (uint) {
        // Withdraw funds from balance
        campaigns[id].balance += msg.value;
        // Return whats left on the balance of the contract
        return campaigns[id].balance;
    }

    /***************************
     * Getters
    ***************************/
    /// Method to get a list of campaigns where publisher is participating
    function getPublisherInvolvedCampaings(address publisher)
             public
             constant
             returns(uint[]) {
        // List of campaigns where publisher is involved in
        return publishersWork[publisher];
    }

    /// Method that returns all the indexes of campaigns
    function getAllCampaings()
             public
             constant
             returns(uint) {
        // Return the amount of campaigns
        return campaigns.length;
    }

    /// Get info of specific campaign
    function getCampaign(uint id)
             public
             constant
             returns(uint, bool, string, uint) {
        // Return span of variables that represent the specific
        // marketing campaign
        return(id, campaigns[id].active, campaigns[id].name, campaigns[id].balance);
    }

    /// Get info of specific campaign [OWNER]
    function getOwnerCampaign(uint id)
             public
             constant
             ownerOnly(id)
             returns(uint, bool, string, uint) {
        // Return span of variables that represent the specific
        // marketing campaign
        return(id, campaigns[id].active, campaigns[id].name, campaigns[id].balance);
    }

    /// Get amount of Ad Slots
    function getAllAdSlots()
             public
             constant
             returns(uint) {
        // Return the size of Ad Slots array
        return adSlots.length;
    }

    /// Get info of specific Ad Slot
    function getAdSlot(uint id)
             public
             constant
             returns(bool, string) {
        // Return info of specified ad slot
        return (adSlots[id].active, adSlots[id].name);
    }

    /// Get info of specific campaign [OWNER]
    function getOwnerAdSlot(uint id)
             public
             constant
             ownerOnly(id)
             returns(bool, string) {
        // Return info of specified ad slot
        return (adSlots[id].active, adSlots[id].name);
    }

    /***************************
     * Setters
    ***************************/
    /// Method to set campaign activity [OWNER]
    function setCampaignActive(uint id, bool state)
             public
             ownerOnly(id) {
        // Set the active state to the parameter passed
        campaigns[id].active = state;
    }

    /// Method to set adSlots activity [OWNER]
    function setAdSlotActive(uint id, bool state)
             public
             ownerOnly(id) {
        // Set the active state to the parameter passed
        adSlots[id].active = state;
    }
}
