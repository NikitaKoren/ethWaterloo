pragma solidity ^0.4.0;

contract SmartAd {

    /***************************
     * Constatns/Variables
    ***************************/
    uint constant fractionAdvertiser = 100000;
    uint constant fractionViewer     = 1000000;

    struct Campaign {
        bool active;
        uint balance;
        mapping(address => Advertiser) advertisers;
    }

    struct Advertiser {
        address[] clients;
    }

    /***************************
     * Mapping
    ***************************/
    mapping(address => Campaign) public campaign;

    /***************************
     * Validation
    ***************************/
    modifier enoughInitialFunds(uint clientRate, uint advertiserRate) {
        require(msg.value >= (clientRate + advertiserRate));
        _;
    }

    modifier activeCampaign(address addr) {
        require(campaign[addr].active == true);
        _;
    }

    modifier canPayoutViewer(address addr) {
        require(campaign[addr].balance >= fractionViewer);
        _;
    }

    modifier canPayoutAdv(address addr) {
        require(campaign[addr].balance >= fractionAdvertiser);
        _;
    }

    /***************************
     * Functions
    ***************************/
    /// Method to initialzie a marketing campaign triggered by
    /// advertiser
    function initializeCampaign()
             public
             payable {
        campaign[msg.sender].active  = true;
        campaign[msg.sender].balance = msg.value;
    }

    /// Method to register a view by client and pay out a fraction of
    /// fund to a publisher for hosting the add & code that runs it
    function adView(address addr)
             public
             activeCampaign(addr)
             canPayoutAdv(addr)
             payable{
        // Payout funds to publisher
        campaign[addr].balance -= fractionAdvertiser;
        msg.sender.transfer(fractionAdvertiser);
    }

    /// Method to register am emgagement by client and pay out a fraction of
    /// fund to a client interacting with add
    function adInteraction(address addr, address viewer)
             public
             activeCampaign(addr)
             canPayoutViewer(addr)
             payable{
        // Payout funds to publisher
        campaign[addr].balance -= fractionViewer;
        viewer.transfer(fractionViewer);
    }
}
