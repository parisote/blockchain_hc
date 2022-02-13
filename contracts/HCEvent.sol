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

    function mintEvent(uint _person_id, TypeEvent _type, string memory _uri) public onlyOwner{
        uint event_id = _tokenIdCounter.current();
        _events[msg.sender][event_id] = Event(event_id, _person_id, _type, _uri);
        _events_by_owner[msg.sender].push(event_id);
        _tokenIdCounter.increment();

        emit newEvent(msg.sender);
    }

    function _burnEvent(uint _id, address _from) public onlyOwner{
        delete(_events[_from][_id]);     
    }
}