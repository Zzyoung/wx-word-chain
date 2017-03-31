export default function RedBlackBST () {
    this.root = null;
}

var RED = true;
var BLACK = false;

function Node (key, val, N, color) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.color = color;
    this.left = null;
    this.right = null;
}

function size (node) {
    if (node === null) {return 0}
        else {return node.N}
}

function min(node) {
    if (node.left === null) {
        return node;
    }
    return min(node.left);
}

function isRed (node) {
    if (node === null) return false;
    return node.color === RED;
}

function rotateLeft (node) {
    var temp = node.right;  
    node.right = temp.left; 
    temp.left = node;       
    temp.color = node.color;    // 保存根节点的颜色
    node.color = RED;           // 经过旋转h成了红色左链接
    temp.N = node.N;
    node.N = 1 + size(node.left) + size(node.right);
    return temp;
}

function rotateRight (node) {
    var temp = node.left;
    node.left = temp.right;
    temp.right = node;
    temp.color = node.color;
    node.color = RED;
    temp.N = node.N;
    node.N = 1 + size(node.left) + size(node.right);
    return temp;
}

function flipColors (node) {
    node.color = !node.color;
    if (node.left !== null) {
        node.left.color = !node.left.color;
    }
    if (node.right !== null) {
        node.right.color = !node.right.color;
    }
}

function put (node, key, val) {
    if (node == null) {
        return new Node(key, val, 1, RED);
    }

    var cmp = compareTo(key, node.key);
    if (cmp < 0) {
        node.left = put(node.left, key, val);
    } else if (cmp > 0) {
        node.right = put(node.right, key, val);
    } else {
        node.val = val;
    }

    if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.N = size(node.left) + size(node.right) + 1;
    return node;
}

function compareTo (val1, val2) {
    if (val1 < val2) {
        return -1;
    } else if(val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

function get (node, key) {
    if (node === null) {
        return null;
    }
    var cmp = compareTo(key, node.key);

    if (cmp < 0) {
        return get(node.left, key);
    } else if (cmp > 0) {
        return get(node.right, key);
    } else {
        return node.val;
    }
}

function moveRedLeft (node) {
    flipColors(node);
    if (node.right !== null && isRed(node.right.left)) {
        node.right = rotateRight(node.right);
        node = rotateLeft(node);
    }
    return node;
}

function moveRedRight (node) {
    flipColors(node);
    if (node.left !== null && (!isRed(node.left.left))) {
        node = rotateRight(node);
    }
    return node;
}

function balance (node) {
    if (isRed(node.right)) {
        node = rotateLeft(node);
    }
    if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.N = size(node.left) + size(node.right) + 1;
    return node;
}

function deleteMin (node) {
    if (node.left === null) {
        return null;
    }
    if (!isRed(node.left) && !isRed(node.left.left)) {
        node = moveRedLeft(node);
    }
    node.left = deleteMin(node.left);
    return balance(node);
}

function remove (node, key) {
    if (compareTo(key, node.key) < 0) {
        if (!isRed(node.left) && !isRed(node.left.left)) {
            node = moveRedLeft(node);
        }
        node.left = remove(node.left, key);
    } else {
        if (isRed(node.left)) {
            node = rotateRight(node);
        }
        if (compareTo(key, node.key) === 0 && node.right === null) {
            return null;
        }
        if ((!isRed(node.right)) && (!isRed(node.right.left))) {
            node = moveRedRight(node);
        }
        if (compareTo(key, node.key) === 0) {
            node.val = get(node.right, min(node.right).key);
            node.key = min(node.right).key;
            node.right = deleteMin(node.right);
        } else {
            node.right = remove(node.right, key);
        }
    }

    return balance(node);
}

function getByFirstLetter(node, prefix) {
    if (node === null) {
        return null;
    }
    var cmp = compareTo(prefix, node.key.charAt(0));
    if (cmp < 0) {
        return getByFirstLetter(node.left, prefix);
    } else if (cmp > 0) {
        return getByFirstLetter(node.right, prefix);
    } else {
        return node.val;
    }
}

RedBlackBST.prototype.size = function () {
    return size(this.root);
}

RedBlackBST.prototype.isEmpty = function () {
    return size(this.root) === 0;
}

RedBlackBST.prototype.put = function (key, val) {
    this.root = put(this.root, key, val)
    this.root.color = BLACK;
}

RedBlackBST.prototype.get = function (key) {
    return get(this.root, key);
}

RedBlackBST.prototype.deleteMin = function () {
    if ((!isRed(this.root.left)) && (!isRed(this.root.right))) {
        this.root.color = RED;
    }
    this.root = deleteMin(this.root);
    if (!this.isEmpty()) {
        this.root.color = BLACK;
    }
}

RedBlackBST.prototype.remove = function (key) {
    if ((!isRed(this.root.left)) && (!isRed(this.root.right))) {
        this.root.color = RED;
    }
    this.root = remove(this.root, key);
    if (!this.isEmpty()) {
        this.root.color = BLACK;
    }
}

RedBlackBST.prototype.getByFirstLetter = function (prefix) {
    return getByFirstLetter(this.root, prefix);
}

