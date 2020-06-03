/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  let pre = null
  let cur = head
  let pos = 0
  while (cur !== null) {
    if (pos < k) {
      let next = cur.next
      cur.next = pre
      pre = cur
      cur = next
      pos++
    } else {
      pos = 0
    }
  }
  return pre
};