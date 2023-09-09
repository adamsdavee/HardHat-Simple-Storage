// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 favouriteNumber;
    //People public person = People({favouriteNumber: 13, Name: "David"});

    mapping(uint256 => string) public nameToFavouriteNumber;

    struct People {
        uint256 favouriteNumber;
        string Name;
    }
    // Array is a better way of storing values
    People[] public people;

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    //To create a getter function at the backend of the public keyword
    // cost doesen't apply except called by another function or contract for view and public
    // ... keywords as they do not modify the blockchain
    // view(only read state but can't update the blockchain)
    // pure(you can't read from the blockchain or update the state of the blockchain)
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    // calldata, memory(both means they exist tempoarily when their function is called), storage
    // calldata can't be modified but memory can be modified
    // i.e calldata _name != cat again but memory _name = cat.
    // storage is permanent variables that can be modified
    function addPerson(string memory _Name, uint256 _favouriteNumber) public {
        people.push(People(_favouriteNumber, _Name));
        //People memory newPerson = People({favouriteNumber: _favouriteNumber, Name: _Name});
        //people.push(newPerson);
        nameToFavouriteNumber[_favouriteNumber] = _Name;
    }
}
