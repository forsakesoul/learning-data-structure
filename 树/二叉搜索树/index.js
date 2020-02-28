// 原文 https://mp.weixin.qq.com/s/PpR1Lvg8pk3dRWHmVtaBYw
const INSERT_RECURSIVE = Symbol("BST#recursiveInsert");
const SEARCH_RECURSIVE = Symbol("BST#recursiveSearch");
const PRE_ORDER_TRAVERSE_RECURSIVE = Symbol("BST#recursivePreOrderTraverse");
const IN_ORDER_TRAVERSE_RECURSIVE = Symbol("BST#recursiveInOrderTraverse");
const POST_ORDER_TRAVERSE_RECURSIVE = Symbol("BST#recursivePostOrderTraverse");
const DESTROY_RECURSIVE = Symbol("BST#recursiveDestroy");
const REMOVE_NODE_RECURSIVE = Symbol("BST#recursiveRemoveNode");

class BST {
  constructor() {
    this.root = null; // 初始化根节点
    this.count = 0; // 记录二叉搜索的数量

    this.Node = function(value) {
      return {
        value, // 节点值
        count: 1, // 节点数量，允许节点重复
        left: null, // 左侧子节点
        right: null // 右侧子节点
      };
    };
    this.CopyNode = function(node) {
      return {
        value: node.value,
        count: node.count,
        left: node.left,
        right: node.right
      };
    };
  }

  insert(value) {
    this.root = this[INSERT_RECURSIVE](this.root, value);
  }

  /**
   * 递归插入
   * 插入过程和链表类似
   * @param {Object} node
   * @param {Number} value
   */
  [INSERT_RECURSIVE](node, value) {
    // {1} 如果当前节点为空，创建一个新节点（递归到底）
    if (node === null) {
      this.count++;
      return new this.Node(value);
    }
    // {2} 节点数不变，说明要更新的值等于二叉树中的某个节点值
    if (value === node.value) {
      node.count++; // 节点数加 1
    } else if (value < node.value) {
      // {3} 新插入子节点在二叉树左边，继续递归插入
      node.left = this[INSERT_RECURSIVE](node.left, value);
    } else if (value > node.value) {
      // {4} 新插入子节点在二叉树右边，继续递归插入
      node.right = this[INSERT_RECURSIVE](node.right, value);
    }
    return node;
  }

  /**
   * 二叉树中搜索节点
   * @param {Number} value
   * @return {Boolean} [true|false]
   */
  search(value) {
    return this[SEARCH_RECURSIVE](this.root, value);
  }
  // 行 {1} 先判断传入的 node 是否为 null，如果为 null 就表示查找失败，返回 false。
  // 行 {2} 说明已经找到了节点，返回 true。
  // 行 {3} 表示要找的节点，比当前节点小，在左侧节点继续查找。
  // 行 {4} 表示要找的节点，比当前节点大，在右侧节点继续查找。
  [SEARCH_RECURSIVE](node, value) {
    if (node === null) {
      return false;
    } else if (value == node.value) {
      return true;
    } else if (value < node.value) {
      return this[SEARCH_RECURSIVE](node.left, value);
    } else if (value > node.value) {
      return this[SEARCH_RECURSIVE](node.right, value);
    }
  }

  /**
   * 先序遍历
   * @param {Function} cb
   */
  preOrderTraverse(cb) {
    return this[PRE_ORDER_TRAVERSE_RECURSIVE](this.root, cb);
  }
  // 行 {1} 先访问节点本身（从树的顶端开始）
  // 行 {2} 访问左侧节点
  // 行 {3} 访问右侧节点
  [PRE_ORDER_TRAVERSE_RECURSIVE](node, cb) {
    if (node !== null) {
      cb(node.value);
      this[PRE_ORDER_TRAVERSE_RECURSIVE](node.left, cb);
      this[PRE_ORDER_TRAVERSE_RECURSIVE](node.right, cb);
    }
  }

  /**
   * 中序遍历
   * @param {Function} cb
   */
  inOrderTraverse(cb) {
    return this[IN_ORDER_TRAVERSE_RECURSIVE](this.root, cb);
  }
  // 行 {1} 访问左侧节点
  // 行 {2} 访问节点本身
  // 行 {3} 访问右侧节点
  [IN_ORDER_TRAVERSE_RECURSIVE](node, cb) {
    if (node !== null) {
      this[IN_ORDER_TRAVERSE_RECURSIVE](node.left, cb);
      cb(node.value);
      this[IN_ORDER_TRAVERSE_RECURSIVE](node.right, cb);
    }
  }

  /**
   * 后序遍历
   * @param {Function} cb
   */
  postOrderTraverse(cb) {
    return this[POST_ORDER_TRAVERSE_RECURSIVE](this.root, cb);
  }
  // {1} 访问左侧节点
  // {2} 访问右侧节点
  // {3} 取当前节点本身
  [POST_ORDER_TRAVERSE_RECURSIVE](node, cb) {
    if (node !== null) {
      this[POST_ORDER_TRAVERSE_RECURSIVE](node.left, cb);
      this[POST_ORDER_TRAVERSE_RECURSIVE](node.right, cb);
      cb(node.value);
    }
  }

  destroy() {
    this.root = this[DESTROY_RECURSIVE](this.root);
  }
  [DESTROY_RECURSIVE](node) {
    if (node !== null) {
      this[DESTROY_RECURSIVE](node.left);
      this[DESTROY_RECURSIVE](node.right);

      node = null;
      this.count--;
      return node;
    }
  }

  minNodeValue() {
    const result = this.minNode(this.root);
    return result !== null ? result.value : null;
  }

  minNode(node) {
    if (node === null) {
      return node;
    }
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  maxNodeValue() {
    let node = this.root;
    if (node === null) {
      return node;
    }
    while (node && node.right !== null) {
      node = node.right;
    }
    return node.value;
  }

  removeNode(value) {
    this.root = this[REMOVE_NODE_RECURSIVE](this.root, value);
  }
  // {1} 先判断节点是否为 null，如果等于 null 直接返回。
  // {2} 判断要删除节点小于当前节点，往树的左侧查找
  // {3} 判断要删除节点大于当前节点，往树的右侧查找
  // {4} 节点已找到，另划分为四种情况
  // {4.1} 当前节点即无左侧节点又无右侧节点，直接删除，返回 null
  // {4.2} 若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
  // {4.3} 若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
  // {4.4} 若左侧节点、右侧节点都不为空情况
  /**
   * 删除一个递归 node
   * @param {Object} node
   * @param {Number} value
   */
  [REMOVE_NODE_RECURSIVE](node, value) {
    // {1} 未查找到直接返回 null
    if (node === null) {
      return node;
    }

    // {2} 左侧节点递归删除
    if (value < node.value) {
      node.left = this[REMOVE_NODE_RECURSIVE](node.left, value);
      return node;
    }

    // {3} 右侧节点递归删除
    if (value > node.value) {
      node.right = this[REMOVE_NODE_RECURSIVE](node.left, value);
      return node;
    }

    // {4} value === node.value 节点找到
    // {4.1} 当前节点即无左侧节点又无右侧节点，直接删除，返回 null
    if (node.left === null && node.right === null) {
      node = null;
      this.count--;
      return node;
    }

    // {4.2} 若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
    if (node.left === null) {
      node = node.right;
      this.count--;
      return node;
    }

    // {4.3} 若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
    if (node.right === null) {
      node = node.left;
      this.count--;
      return node;
    }

    // {4.4} 若左侧节点、右侧节点都不为空情
    // s = min(n->right)况
    if (node.left !== null && node.right !== null) {
      // 找到最小节点
      const s = new this.CopyNode(this.minNode(node.right));
      this.count++;
      s.left = node.left;
      s.right = this[REMOVE_NODE_RECURSIVE](node.right, s.value); // 删除最小节点
      node = null;
      this.count--;
      return s; // 返回 s 节点替换掉 node 节点
    }
  }
}

const bst = new BST();

bst.insert(30);
bst.insert(25);
bst.insert(36);
bst.insert(20);
bst.insert(28);
bst.insert(32);
bst.insert(40);

console.dir(bst, { depth: 4 });

console.log(bst.search(20));
console.log(bst.search(10));
function printNode(value) {
  console.log(value);
}
console.log("前序遍历 start");
bst.preOrderTraverse(console.log);
console.log("前序遍历 end");

console.log("中序遍历 start");
bst.inOrderTraverse(console.log);
console.log("中序遍历 end");

console.log("后序遍历 start");
bst.postOrderTraverse(console.log);
console.log("后序遍历 end");

console.log(bst.minNodeValue());

bst.removeNode(30);

console.dir(bst, { depth: 4 });
