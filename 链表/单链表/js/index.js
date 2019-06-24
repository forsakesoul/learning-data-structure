class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

class Link {
  constructor() {
    this.head = new Node('head')
  }

  // 根据值查找
  findByValue(item) {
    let currentNode = this.head.next
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode === null ? -1 : currentNode
  }

  // 根据节点查找
  findByIndex(index) {
    let currentNode = this.head.next
    let pos = 0
    while (currentNode !== null && pos !== index) {
      currentNode = currentNode.next
      pos++
    }
    return currentNode === null ? -1 : pos
  }

  append(newEle) {
    const newNode = new Node(newEle)
    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
  }

  insert(newElement, element) {
    const currentNode = this.findByValue(element)
    if (currentNode === -1) {
      console.log('没找到');
      return;
    }
    const newNode = new Node(newElement)
    newNode.next = currentNode.next
    currentNode.next = newNode
  }
}

const list = new Link()
console.log('list', list)
list.append('one')
list.append('two')
console.log('list', list)