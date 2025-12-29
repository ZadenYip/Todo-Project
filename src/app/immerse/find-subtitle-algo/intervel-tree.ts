export class TreeNode<K, V> {
    /**
     * True for red, false for black
     */
    public key: K;
    public value: V;
    public color: boolean;
    public parent: TreeNode<K, V>;
    public left: TreeNode<K, V>;
    public right: TreeNode<K, V>;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.color = false;
        this.parent = this;
        this.left = this;
        this.right = this;
    }
}

export class RedBlackTree<K, V> {
    root: TreeNode<K, V>;
    sentinel: TreeNode<K, V>;
    comparator: (a: K, b: K) => number;

    /**
     * 
     * @param sentinelKey 
     * @param sentinelValue 
     * @param comparator - return <0 if a<b, 0 if a==b, >0 if a>b
     * 
     */
    constructor(sentinelKey: K, sentinelValue: V, comparator: (a: K, b: K) => number) {
        this.sentinel = new TreeNode(sentinelKey, sentinelValue);
        this.comparator = comparator;
        this.sentinel.color = false;
        this.sentinel.parent = this.sentinel;
        this.sentinel.left = this.sentinel;
        this.sentinel.right = this.sentinel;
        this.root = this.sentinel;
    }

    search(key: K): TreeNode<K, V> | null {
        let cur = this.root;
        while (cur !== this.sentinel) {
            const cmp = this.comparator(key, cur.key);
            if (cmp === 0) {
                return cur;
            } else if (cmp < 0) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return null;
    }

    insert(key: K, value: V): void {
        let cur = this.root;
        let traillingPointer = this.sentinel;
        while (cur !== this.sentinel) {
            traillingPointer = cur;
            const cmp = this.comparator(key, cur.key);
            if (cmp < 0) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        // Now cur is null and traillingPointer is the parent
        const newNode = new TreeNode(key, value);
        newNode.key = key;
        newNode.parent = traillingPointer;
        const cmp = this.comparator(key, traillingPointer.key);

        if (traillingPointer === this.sentinel) {
            // Tree was empty
            this.root = newNode;
        } else if (cmp < 0) {
            // Insert as left child
            traillingPointer.left = newNode;
        } else {
            // Insert as right child
            traillingPointer.right = newNode;
        }

        newNode.left = this.sentinel;
        newNode.right = this.sentinel;
        // New node must be red
        newNode.color = true;
        this.fixInsert(newNode);
    }

    private fixInsert(fixNode: TreeNode<K, V>): void {
        while (fixNode.parent.color) {
            if (fixNode.parent === fixNode.parent.parent.left) {
                // Parent is a left child
                const uncle = fixNode.parent.parent.right;
                if (uncle.color) {
                    // Case 1: Uncle and parent are red
                    fixNode.parent.color = false;
                    uncle.color = false;
                    fixNode.parent.parent.color = true;

                    // next iteration
                    fixNode = fixNode.parent.parent;
                } else {
                    // case 2 and 3: Uncle is black
                    if (fixNode === fixNode.parent.right) {
                        // case 2: fixNode is right child
                        fixNode = fixNode.parent;
                        this.leftRotate(fixNode);
                    }
                    // case 3: fixNode is left child
                    fixNode.parent.color = false;
                    fixNode.parent.parent.color = true;
                    this.rightRotate(fixNode.parent.parent);
                }
            } else {
                // sysmetric to above
                // Parent is a left child
                const uncle = fixNode.parent.parent.left;
                if (uncle.color) {
                    // Case 1: Uncle and parent are red
                    fixNode.parent.color = false;
                    uncle.color = false;
                    fixNode.parent.parent.color = true;

                    // next iteration
                    fixNode = fixNode.parent.parent;
                } else {
                    // case 2 and 3: Uncle is black
                    if (fixNode === fixNode.parent.left) {
                        // case 2: fixNode is right child
                        fixNode = fixNode.parent;
                        this.rightRotate(fixNode);
                    }
                    // case 3: fixNode is left child
                    fixNode.parent.color = false;
                    fixNode.parent.parent.color = true;
                    this.leftRotate(fixNode.parent.parent);
                }
            }
        }
        // Ensure root is black
        this.root.color = false;
    }

    leftRotate(x: TreeNode<K, V>): void {
        // Before:
        //           P
        //           |
        //           x
        //         /   \
        //       T1     y
        //             / \
        //           T2   T3
        const y = x.right;
        x.right = y.left;
        if (y.left !== this.sentinel) {
            y.left.parent = x;
        }

        y.parent = x.parent;
        if (x.parent === this.sentinel) {
            // x was root
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    rightRotate(x: TreeNode<K, V>): void {
        // Before:
        //           P
        //           |
        //           x
        //         /   \
        //       T1     y
        //             / \
        //           T2   T3
        const y = x.left;
        x.left = y.right;
        if (y.right !== this.sentinel) {
            y.right.parent = x;
        }

        y.parent = x.parent;
        if (x.parent === this.sentinel) {
            // x was root
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }

        y.right = x;
        x.parent = y;
    }
}
