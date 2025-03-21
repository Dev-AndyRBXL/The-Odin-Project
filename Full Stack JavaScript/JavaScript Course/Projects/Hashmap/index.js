class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.size = 0;
    this.table = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const base = 37;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * base + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    let curr = this.table[index];

    if (!curr) {
      this.table[index] = new Node(key, value);
      this.size++;
    } else {
      let prev = null;
      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        prev = curr;
        curr = curr.next;
      }
      prev.next = new Node(key, value);
      this.size++;
    }

    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    let curr = this.table[index];

    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    let curr = this.table[index];
    let prev = null;

    while (curr) {
      if (curr.key === key) {
        if (prev) {
          prev.next = curr.next;
        } else {
          this.table[index] = curr.next;
        }
        this.size--;
        return true;
      }
      prev = curr;
      curr = curr.next;
    }

    return false;
  }

  resize() {
    const oldTable = this.table;
    this.capacity *= 2;
    this.size = 0;
    this.table = new Array(this.capacity).fill(null);

    for (const headNode of oldTable) {
      let curr = headNode;
      while (curr) {
        this.set(curr.key, curr.value);
        curr = curr.next;
      }
    }
  }

  keys() {
    const arr = [];
    for (const headNode of this.table) {
      let curr = headNode;
      while (curr) {
        arr.push(curr.key);
        curr = curr.next;
      }
    }
    return arr;
  }

  values() {
    const arr = [];
    for (const headNode of this.table) {
      let curr = headNode;
      while (curr) {
        arr.push(curr.value);
        curr = curr.next;
      }
    }
    return arr;
  }

  entries() {
    const arr = [];
    for (const headNode of this.table) {
      let curr = headNode;
      while (curr) {
        arr.push([curr.key, curr.value]);
        curr = curr.next;
      }
    }
    return arr;
  }
}

const map = new HashMap();
map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray');
map.set('frog', 'green');
map.set('grape', 'purple');
map.set('hat', 'black');
map.set('ice cream', 'white');
map.set('jacket', 'blue');
map.set('kite', 'pink');
map.set('lion', 'golden');

console.log('Before:', map.entries());

map.set('carrot', 'green');
map.set('Pineapple', 'Yellow');
map.set('Skibidi', 'Yellow');
map.set('Gyatt', 'Yellow');
map.set('Ohio', 'Yellow');
map.set('Rizz', 'Yellow');

console.log('After:', map.entries());
