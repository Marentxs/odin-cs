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
    const keys = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          const [key, value] = entry;
          keys.push(key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          const [key, value] = entry;
          values.push(value);
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          entries.push(entry);
        }
      }
    }
    return entries;
  }
}
