class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

class Link {
  constructor() {
    this.head = new Node('head')
    this.size = 0;
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
    return currentNode === null ? -1 : currentNode
  }

  append(newEle) {
    const newNode = new Node(newEle)
    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
    this.size++
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
    this.size++
  }

  findPrev(element) {
    let currentNode = this.head
    while (element !== currentNode.next.element && currentNode.next !== null) {
      currentNode = currentNode.next
    }
    if (currentNode.next === null) {
      return -1
    }
    return currentNode
  }

  remove(element) {
    const prevNode = this.findPrev(element)
    if (prevNode === -1) {
      console.log('没找到')
      return -1;
    }
    const removeItem = prevNode.next;
    prevNode.next = prevNode.next.next;
    this.size--
    return removeItem.element;
  }

  display() {
    let currentNode = this.head.next
    let displayArr = [];
    while (currentNode !== null) {
      displayArr.push(currentNode.element)
      currentNode = currentNode.next
    }
    return displayArr
  }

  getSize() {
    return this.size;
  }
}

const list = new Link()
list.append('one')
list.append('two')
list.append('three')
list.append('four')
list.append('five')
console.log('list', list.display())
console.log('size', list.getSize())
// console.log('prev', list.findPrev('two'))
// console.log('remove', list.remove('four'))
// console.log('after-remove', list.display())
// console.log('find-By-index', list.findByIndex(1))
// console.log('find-By-value', list.findByValue('two'))