// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract VotesContract {

    uint public counter = 0;

    /* Se define la estructura del voto */
    struct Vote {
        uint256 id;
        string fullname;
        string option;
        bool done;
        uint256 createdAt;
    }

    /*Aqui se mapea cada voto como un array */
    mapping (uint256 => Vote ) public votes;

    //hacer el voto
    function doVote(string memory _fullname, string memory _option) public {
        votes[counter] = Vote(counter, _fullname, _option, false, block.timestamp);
        counter++;
    }

    //procesar el voto
    function proccessVote() public {

    }
}
