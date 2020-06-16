class MaxHeap {
  static DEFAULT_SIZE = 1023

  /**
   * Create a new empty max heap of a given size, optionally from an existing array
   * 
   * @param {number} [size=1023] Maximum capacity of the queue
   * @param {{priority: number, element: *}[]} [fromArray] Build the heap from this array instead. The given array must be 1-indexed, and records must have the given form.
   */
  constructor({ size = this.constructor.DEFAULT_SIZE, fromArray } = {}) {
    if (fromArray) {
      this._storage = fromArray;
      this._size = fromArray.length - 1;
      this._count = this._size;
      this._buildheap();

    } else {
      this._size = size;

      // Create storage array with sentinel
      this._storage = [null];

      // Add record slots to storage array
      for (let i = 1; i <= size; i += 1) {
        this._storage.push({ priority: undefined, element: undefined });
      }

      // Last index will always be at count
      this._count = 0;
    }
  }

  /**
   * Use a heap to sort an array in-place in n*log(n) time
   * 
   * @param {{priority: number, element: *}[]} [array] Data to sort. The given array must be 1-indexed, and records must have the given form.
   */
  static heapsort(array) {
    const heap = new MaxHeap({ fromArray: array });
    heap.sort();
  }

  _left(i) {
    return 2 * i;
  }

  _right(i) {
    return 2 * i + 1;
  }

  _parent(i) {
    return Math.floor(i / 2);
  }

  _swap(i, j) {
    // Note: in a language like C, Java or Rust, where the array is full of records
    // instead of references to records, we would need to swap the priority and
    // the reference to the element instead of the records themselves.
    const temp = this._storage[i];
    this._storage[i] = this._storage[j];
    this._storage[j] = temp;
  }

  _float(i) {
    let p = this._parent(i);
    while (p > 0 && this._storage[p] < this._storage[i]) {
      this._swap(i, p);

      i = p;
      p = this._parent(i);
    }
  }

  _sink(i) {
    let finished = false
    while(!finished) {
      let l = this._left(i)
      let r = this._right(i)

      let max = i
      if (l <= this._count && this._storage[l] > this._storage[max]) {
        max = l;
      }
      if (r <= this._count && this._storage[r] > this._storage[max]) {
        max = r;
      }

      if (max === i) {
        finished = true;
      } else {
        this._swap(i, max);
        i = max
      }
    }
  }

  _buildheap() {
    let mid = Math.floor(this._size / 2);
    for (let i = mid; i > 0; i -= 1) {
      this._sink(i);
    }
  }

  /**
   * Add a record to the queue with a given priority
   * 
   * @param {number} priority Priority of the record
   * @param {*} element Data to store in this record
   * @throws If the heap is full
   */
  insert(priority, element) {
    if (this._count < this._size) {
      this._storage[this._count] = { priority: priority, element: element };
      this._count += 1;
      this._float(this._count)
    }
    else {
      throw new Error("error");
    }
  }

  /**
   * Remove and return the record with the highest priority
   * 
   * @returns {*} The data stored in the highest-priority record, or undefined if the queue is empty
   */
  removeMax() {
    if (this._count === 0) {
      return undefined;
    }

    let first = this._storage[1].element;
    this._storage[1].element = undefined;

    this._swap(1, this._count);
    this._count -= 1;
    this._sink(1);

    return first;  }

  /** 
   * How many records are in the priority queue?
   * 
   * @returns {number} Record count
   */
  count() {
    return this._count;
  }

  /**
   * Turn this max heap into a sorted array
   * 
   * Destroys the max heap in the process - insert, removeMax, etc will NOT
   * work after this function has been run
   * 
   * @returns Sorted storage array. Note that the array is 1-indexed (so the first element is null)
   */
  sort() {
    // TODO
  }
}

export default MaxHeap;