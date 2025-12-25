class TreeNode {
    /**
     * True for red, false for black
     */
    public key: number;
    public color: boolean;
    public parent: TreeNode | null;
    public left: TreeNode | null;
    public right: TreeNode | null;

    constructor() {
        this.key = Number.NaN;
        this.color = true;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class RedBlackTree {
    root: TreeNode | null;
    sentinel: TreeNode;

    constructor() {
        this.root = null;
        this.sentinel = new TreeNode();
        this.sentinel.color = false;
        this.sentinel.parent = this.sentinel;
        this.sentinel.left = this.sentinel;
        this.sentinel.right = this.sentinel;
    }

    insert(elementKey: number): void {
        let cur: TreeNode | null = this.root;
        let traillingPointer = null;
        while (cur !== null) {
            traillingPointer = cur;
            if (elementKey < cur.key) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        // Now cur is null and traillingPointer is the parent
        const newNode = new TreeNode();
        newNode.key = elementKey;
        newNode.parent = traillingPointer;

        if (traillingPointer === null) {
            // Tree was empty
            this.root = newNode;
        } else if (elementKey < traillingPointer.key) {
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

    fixInsert(fixNode: TreeNode): void {
        while (fixNode.parent!.color) {
            if (fixNode.parent === fixNode.parent!.parent!.left) {
                // Parent is a left child
                const uncle = fixNode.parent!.parent!.right;
                if (uncle!.color) {
                    // Case 1: Uncle and parent are red
                    fixNode.parent!.color = false;
                    uncle!.color = false;
                    fixNode.parent!.parent!.color = true;

                    // next iteration
                    fixNode = fixNode.parent!.parent!;
                } else {
                    // case 2 and 3: Uncle is black
                    if (fixNode === fixNode.parent!.right) {
                        // case 2: fixNode is right child
                        fixNode = fixNode.parent!;
                        this.leftRotate(fixNode);
                    }
                    // case 3: fixNode is left child
                    fixNode.parent!.color = false;
                    fixNode.parent!.parent!.color = true;
                    this.rightRotate(fixNode.parent!.parent!);
                }
            } else {
                // sysmetric to above
                // Parent is a left child
                const uncle = fixNode.parent!.parent!.left;
                if (uncle!.color) {
                    // Case 1: Uncle and parent are red
                    fixNode.parent!.color = false;
                    uncle!.color = false;
                    fixNode.parent!.parent!.color = true;

                    // next iteration
                    fixNode = fixNode.parent!.parent!;
                } else {
                    // case 2 and 3: Uncle is black
                    if (fixNode === fixNode.parent!.left) {
                        // case 2: fixNode is right child
                        fixNode = fixNode.parent!;
                        this.rightRotate(fixNode);
                    }
                    // case 3: fixNode is left child
                    fixNode.parent!.color = false;
                    fixNode.parent!.parent!.color = true;
                    this.leftRotate(fixNode.parent!.parent!);
                }
            }
        }
    }

    leftRotate(x: TreeNode): void {
        // Before:
        //           P
        //           |
        //           x
        //         /   \
        //       T1     y
        //             / \
        //           T2   T3
        const y = x.right!;
        x.right = y.left;
        if (y.left !== this.sentinel) {
            y.left!.parent = x;
        }

        y.parent = x.parent;
        if (x.parent === this.sentinel) {
            // x was root
            this.root = y;
        } else if (x === x.parent!.left) {
            x.parent!.left = y;
        } else {
            x.parent!.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    rightRotate(x: TreeNode): void {
        // Before:
        //           P
        //           |
        //           x
        //         /   \
        //       T1     y
        //             / \
        //           T2   T3
        const y = x.left!;
        x.left = y.right;
        if (y.right !== this.sentinel) {
            y.right!.parent = x;
        }

        y.parent = x.parent;
        if (x.parent === this.sentinel) {
            // x was root
            this.root = y;
        } else if (x === x.parent!.right) {
            x.parent!.right = y;
        } else {
            x.parent!.left = y;
        }

        y.right = x;
        x.parent = y;
    }
}
