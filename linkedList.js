'use strict';


class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}


class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  find(item) {
    //start at the head
    let currNode = this.head;
    //if the list is empty
    if (!this.head) {
      return null;
    }
    //Check for the item 
    while (currNode.value !== item) {
      //return null if end of the list 
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      }
      else {
        //otherwise keep looking 
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }
  remove(item) {
    //if the list is empty
    if (!this.head) {
      return null;
    }
    //if the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //keep track of previous
    let prevNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      //save the previous node 
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
  insertBefore(nextNode, item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      let prevNode = this.head;

      while ((currNode !== null) && (currNode.value !== nextNode)) {
        prevNode = currNode;
        currNode = currNode.next;
      }
      //   if (currNode === null) {
      //     console.log('Item not found on list');
      //     return;
      //   }
      prevNode.next = new _Node(item, currNode);

    }
  }

  insertAfter(prevNode, item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      let prevNode = this.head;

      while ((currNode !== null) && (currNode.value !== prevNode)) {
        //save the previous node 
        prevNode = currNode;
        currNode = currNode.next;
      }
      if (currNode !== null) {
        console.log('Item not found on list');
        return;
      }
      prevNode.next = new _Node(item, currNode);

    }
  }

  insertAt(index, item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    let i = 0;

    while (i !== index) {
      if (!currNode.next) {
        console.log('This index does not exist use insertLast to add to the end of the list');
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
      i++;
    }
    if (currNode === null) {
      console.log('Item not found on list (insertAt)');
      return;
    }

    let pushedItem = prevNode;
    let newItem = new _Node(item, prevNode.next);
    //    console.log(pushedItem);
    pushedItem.next = newItem;
    // to insert & replace use below
    //   this.remove(targetNode);
  }


}


function displayQuestion(list) {
  if (list.head) {
    console.log(list.head.value);
    return list.head.value.title;
  } else {
    console.log('Empty List');
    return;
  }
}

function displayAnswer(list) {
  if (list.head) {
    console.log(list.head.value);
    return list.head.value.content;
  } else {
    console.log('Empty List');
    return;
  }
}

function size(list) {

  let currNode = list.head;
  let i = 0;

  while (currNode.next !== null) {
    currNode = currNode.next;
    i++;
  }
  console.log(i);
  return i;
}


function isEmpty(list) {
  if (list.head) {
    console.log('false');
  } else {
    console.log('true');
  }
}

function findPrevious(list, key) {
  if (!list.head) {
    return;
  }

  let currNode = list.head;
  let prevNode = list.head;

  while (currNode.value !== key) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  console.log(prevNode.value);
  return prevNode.value;
}

function findLast(list) {
  if (!list.head) {
    return;
  }

  let currNode = list.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }

  console.log(currNode.value);
  return currNode.value;
}


//Mystery program
// Analyze the following function (without running it in an IDE) to determine what problem it is trying to solve.What is the runtime of this algorithm ?

function WhatDoesThisProgramDo(lst) {
  let current = lst.head;
  while (current !== null) { // 1
    let newNode = current;
    while (newNode.next !== null) { // 1 
      if (newNode.next.value === current.value) {
        newNode.next = newNode.next.next;
      }
      else {
        newNode = newNode.next;
      }
    }
    current = current.next;
  }
}

// this program will go the values in the list and remove the duplicates
// ex: tom, joe, jim , tom , mike => tom, joe, jim , mike

// Reverse a list

function reverse(list) {
  if (!list.head) {
    return;
  }
  let currNode = list.head;
  let i = 0;

  while (currNode.next !== null) {
    currNode = currNode.next;
    i++;
  }

  console.log(list);
  return currNode.value;
}

function middleList(list) {

  let mid = size(list) / 2;
  mid = Math.round(mid);

  let currNode = list.head;
  let prevNode = list.head;
  let i = 0;

  while (i !== mid) {
    if (!currNode.next) {
      return;
    }
    prevNode = currNode;
    currNode = currNode.next;
    i++;
  }
  if (currNode === null) {
    return;
  }

  let middle = prevNode;
  //    console.log(pushedItem);
  return console.log(list.find(middle.value));
}

module.exports = { LinkedList, displayQuestion, displayAnswer, findPrevious, reverse} ;