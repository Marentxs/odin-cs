class hashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
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

  set(key, value) {
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
        return;
      }
    }

    // Key doesn't exist, push it
    bucket.push([key, value]);
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
        return true;
      }
    }
    return false;
  }
}
