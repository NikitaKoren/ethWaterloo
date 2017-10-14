pragma solidity ^0.4.15;

contract SmartAd {

    /***************************
     * Constatns/Variables
    ***************************/
    uint constant FRACTION_ADVERTISER = 100000;
    uint constant FRACTION_VIEWER     = 1000000;
    string constant DEFAULT_NAME      = "Default campaign name";

    struct Campaign {
        address owner;
        bool active;
        string name;
        uint balance;
        mapping(address => Publisher) publishers;
    }

    struct Publisher {
        bool onboarded;
        address[] clients;
    }

    Campaign[] public campaign;
    /***************************
     * Mapping
    ***************************/
    mapping(address => uint[]) publishersWork;

    /***************************
     * Validation
    ***************************/
    modifier activeCampaign(uint id) {
        require(campaign[id].active == true);
        _;
    }

    modifier canPayoutViewer(uint id) {
        require(campaign[id].balance >= FRACTION_VIEWER);
        _;
    }

    modifier canPayoutAdv(uint id) {
        require(campaign[id].balance >= FRACTION_ADVERTISER);
        _;
    }

    modifier ownerOnly(uint id) {
        require(campaign[id].owner == msg.sender);
        _;
    }

    modifier enoughFunds(uint id, uint withdrawAmount) {
        require(campaign[id].balance >= withdrawAmount);
        _;
    }

    /***************************
     * Functions
    ***************************/
    /// Method to initialzie a marketing campaign triggered by
    /// advertiser
    function initializeCampaign(string cname)
             public
             payable
             returns(uint) {
        // Push new campaign to the array of campaigns
        Campaign memory newCampaign;
        newCampaign.owner   = msg.sender;
        newCampaign.active  = true;
        newCampaign.name    = bytes(cname).length != 0 ? cname : DEFAULT_NAME;
        newCampaign.balance = msg.value;
        campaign.push(newCampaign);
        // Return the amount of campaigns
        return campaign.length;
    }

    /// Method to register a view by client and pay out a fraction of
    /// fund to a publisher for hosting the add & code that runs it
    function adView(uint id)
             public
             activeCampaign(id)
             canPayoutAdv(id)
             payable {
        // Payout funds to publisher
        campaign[id].balance -= FRACTION_ADVERTISER;
        msg.sender.transfer(FRACTION_ADVERTISER);
    }

    /// Method to register am emgagement by client and pay out a fraction of
    /// fund to a client interacting with add
    function adInteraction(uint id, address viewer)
             public
             activeCampaign(id)
             canPayoutViewer(id)
             payable {
        // Payout funds to publisher
        campaign[id].balance -= FRACTION_VIEWER;
        viewer.transfer(FRACTION_VIEWER);
    }

    /// Method to onboard publisher, executed by publisher
    function onboardPublisher(uint[] id)
             public {
        // Onboard the publisher by iterating thru all selected campaigns to join
        for (uint i = 0; i < id.length; i++) {
            campaign[id[i]].publishers[msg.sender].onboarded = true;
            publishersWork[msg.sender].push(id[i]);
        }
    }

    /// Method to get a list of campaigns where publisher is participating
    function getInvolvedCampaings()
             public
             constant
             returns(uint[]) {
        // List of campaigns where publisher is involved in
        return publishersWork[msg.sender];
    }


    /// Method that returns all the indexes of campaigns
    function getAllCampaings()
             public
             constant
             returns(uint) {
        // Return last inserted index into storage
        return campaign.length;
    }

    /// Get info of specific campaign
    function getCampaign(uint id)
             public
             constant
             returns(uint, bool, string, uint) {
        // Return span of variables that represent the specific
        // marketing campaign
        return(id, campaign[id].active, campaign[id].name, campaign[id].balance);
    }

    /// Method to withdraw funds from the contract if you are the owner
    function withdrawCampaignFunds(uint id, uint withdrawAmount)
             public
             ownerOnly(id)
             enoughFunds(id, withdrawAmount)
             payable
             returns (uint) {
        // Withdraw funds from balance
        campaign[id].balance -= withdrawAmount;
        // Transfer funds to owner of the campaign
        campaign[id].owner.transfer(withdrawAmount);
        // Return whats left on the balance of the contract
        return campaign[id].balance;
    }

    /// Method to add funds from the contract if you are the owner
    function addCampaignFunds(uint id)
             public
             payable
             returns (uint) {
        // Withdraw funds from balance
        campaign[id].balance += msg.value;
        // Return whats left on the balance of the contract
        return campaign[id].balance;
    }
}
