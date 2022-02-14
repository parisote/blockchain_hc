//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HCEvent is Ownable{
    enum TypeEvent { Empty, Allergic }

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    struct Event{
        uint id;
        uint person_id;
        TypeEvent type_event;
        string uri;
    }

    mapping(address => mapping(uint => Event)) public _events;
    mapping(address => uint[]) public _events_by_owner;

    event newEvent(address);

    constructor(){}

    function mintEvent(address _from, uint _person_id, TypeEvent _type, string memory _uri) public onlyOwner{
        uint event_id = _tokenIdCounter.current();
        _events[_from][event_id] = Event(event_id, _person_id, _type, _uri);
        _events_by_owner[_from].push(event_id);
        _tokenIdCounter.increment();

        emit newEvent(_from);
    }

    function getIdEvents(address _from) public view returns(uint[] memory){
        return _events_by_owner[_from];
    }

    function getEvent(address _from, uint id) public view returns(Event memory){
        require(_from == msg.sender, "Can't get events that don't owner you");
        require(_events[_from][id].person_id != 0, "Event don't exist");
        return _events[_from][id];
    }

    function _burnEvent(uint _id, address _from) public onlyOwner{
        delete(_events[_from][_id]);     
    }
}