import { RedBlackTree, TreeNode } from "./intervel-tree";

describe('IntervelTree', () => {

    it('should create an instance', () => {
        let tree = new RedBlackTree();
        expect(tree).toBeTruthy();
    });

    it('should maintain red-black properties after insertions', () => {
        let tree = new RedBlackTree();
        const elementsToInsert = [10, 20, 30, 15, 25, 5, 1];
        
        for (let element of elementsToInsert) {
            tree.insert(element);
            rootIsBlack(tree);
            redNodeHasBlackChildren(tree);
            blackHeightConsistency(tree);
        }
    });

    it('search test', () => {
        let tree = new RedBlackTree();
        const elementsToInsert = [50, 30, 70, 20, 40, 60, 80];
        for (let element of elementsToInsert) {
            tree.insert(element);
        }
        for (let element of elementsToInsert) {
            const result = tree.search(element);
            expect(result).not.toBeNull();
            expect(result!.key).toBe(element);
        }
        expect(tree.search(-1)).toBeNull();
    });

    it('performance test for large number of search', () => {
        let tree = new RedBlackTree();
        const elementsToInsert = [];
        const numElements = 10000;
        for (let i = 0; i < numElements; i++) {
            elementsToInsert.push(i);
            tree.insert(i);
        }

        // compare tree search with linear search
        const startTime = performance.now();
        for (let i = 0; i < numElements; i++) {
            const treeResult = tree.search(i);
        }
        const endTime = performance.now();
        const treeSearchTime = endTime - startTime;
        const linearStartTime = performance.now();
        for (let i = 0; i < numElements; i++) {
            const linearResult = elementsToInsert.find(x => x === i);
        }
        const linearEndTime = performance.now();
        const linearSearchTime = linearEndTime - linearStartTime;

        console.log(`Tree search time: ${treeSearchTime} ms`);
        console.log(`Linear search time: ${linearSearchTime} ms`);
        expect(treeSearchTime).toBeLessThan(linearSearchTime);
    });
});

// invariant: root is black
function rootIsBlack(tree: RedBlackTree) {
    if (tree.root) {
        expect(tree.root.color).toBeFalsy();
    }
}

// invariant: red node has black children
function redNodeHasBlackChildren(tree: RedBlackTree) {
    let deque: TreeNode[] = [];
    deque.push(tree.root);
    // BFS
    while (deque.length > 0) {
        let node = deque.shift()!;
        if (node.color === true) {
            expect(node.left.color).toBeFalsy();
            expect(node.right.color).toBeFalsy();
        }

        if (node.left !== tree.sentinel) {
            deque.push(node.left);
        }
        if (node.right !== tree.sentinel) {
            deque.push(node.right);
        }
    }

}

// invariant: all paths from a node to its descendant leaves have the same number of black nodes
function blackHeightConsistency(tree: RedBlackTree) {

    function isSentinel(node: TreeNode): boolean {
        return node.left === node && node.right === node;
    }

    function blackHeight(node: TreeNode): number {
        if (isSentinel(node)) {
            return 0;
        }

        let leftBlackHeight = blackHeight(node.left);
        let rightBlackHeight = blackHeight(node.right);
        expect(leftBlackHeight).toBe(rightBlackHeight);
        return leftBlackHeight + (node.color === false ? 1 : 0);
    }

    if (tree.root) {
        blackHeight(tree.root);
    }
}

