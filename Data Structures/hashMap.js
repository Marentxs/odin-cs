class hashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  insert(key, value) {
    const index = this.hash(key);

    // If empty, build bucket
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (existingKey === key) {
        bucket[i] = [key, value]; // Key exists, replace entry
        return false;
      }
    }

    // Key doesn't exist, push it
    bucket.push([key, value]);
    return true;
  }

  set(key, value) {
    const isNew = this.insert(key, value);

    if (isNew) {
      this.size++;

      if (this.size / this.capacity > this.loadFactor) {
        this.grow();
      }
    }
  }

  grow() {
    const entries = this.entries();
    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (const [key, value] of entries) {
      this.insert(key, value);
      this.size++;
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return null;
    }

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (existingKey === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (existingKey === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (existingKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const buckets = this.buckets;
    const keys = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        for (let j = 0; j < buckets[i].length; j++) {
          keys.push(buckets[i][j][0]);
        }
      }
    }
    return keys;
  }

  values() {
    const buckets = this.buckets;
    const values = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        for (let j = 0; j < buckets[i].length; j++) {
          values.push(buckets[i][j][1]);
        }
      }
    }
    return values;
  }

  entries() {
    const buckets = this.buckets;
    const entries = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        for (let j = 0; j < buckets[i].length; j++) {
          entries.push(buckets[i][j]);
        }
      }
    }
    return entries;
  }
}
