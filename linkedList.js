'use strict';

class _Node {
    constructor(value, next, prev){
        this.value = value;
        this.next = next;
    }
}
class LinkedList {
    constructor(){
        this.head = null;
    }
    insertFirst(item){
        this.head = new _Node(item, this.head);
    }
    insertLast(item){
        if(!this.head){
            this.insertFirst(item);
        }
        else{
            let tempNode = this.head;
            while(!tempNode.next){
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }
    remove(item){
        if(!this.head){
            return null;
        }
        if(this)
    }
}