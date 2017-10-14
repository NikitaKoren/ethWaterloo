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
    //mapping(address => Campaign) public campaign;

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

    /// Method to onboard publisher, method is executed by owner
    /// of the marketing campaign
    function onboardPublisher(uint id, address publisher)
             public
             activeCampaign(id)
             {
        // Onboard the publisher
        campaign[id].publishers[publisher].onboarded = true;
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
}
