const { deterministicPartitionKey, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it(`Test the function when no input is passed`, () => {
    expect(deterministicPartitionKey()).toBe(TRIVIAL_PARTITION_KEY);
  });

  it(`Test the function when event is passed with small partition key`, () => {
    // When the partition key is string
    let partitionKey = "1234";
    expect(deterministicPartitionKey({ partitionKey })).toBe(partitionKey);
    
    // When the partition key is an object
    partitionKey = { id: "1234" };
    expect(deterministicPartitionKey({ partitionKey })).toBe(JSON.stringify(partitionKey));
  });

  it(`Test the function when event is passed with large partition key`, () => {
    const DUMMY_LARGE_VALUE = "12342323232323232323232323232123423232323232323232323232321234232323232323232323232323212342323232323232323232323232123423232323232323232323232321234232323232323232323232323212342323232323232323232323232123423232323232323232323232321234232323232323232323232323212342323232323232323232323232123423232323232323232323232321234232323232323232323232323212342323232323232323232323232123423232323232323232323232321234232323232323232323232323212342323232323232323232323232";
    
    // When the partition key is string
    let partitionKey = DUMMY_LARGE_VALUE;
    expect(partitionKey.length).toBeGreaterThan(MAX_PARTITION_KEY_LENGTH);

    let result = deterministicPartitionKey({ partitionKey });
    expect(result).not.toBe(partitionKey);
    expect(result.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
    
    // When the partition key is an object
    partitionKey = { id: DUMMY_LARGE_VALUE };

    result = deterministicPartitionKey({ partitionKey });
    expect(result).not.toBe(partitionKey);
    expect(result.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });

  it(`Test the function when event is passed without partition key`, () => {
    // When the event is a string
    let result = deterministicPartitionKey("event");
    expect(result).not.toBe("event");
    expect(result.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
    
    // When the event is an object
    const event = { event: "event" };
    result = deterministicPartitionKey(event);
    expect(result).not.toBe(event);
    expect(result.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });
});
