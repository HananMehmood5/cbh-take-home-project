const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const stringifyEvent = (event, isPartition) => {
  if (isPartition) { 
    return typeof event.partitionKey !== "string"
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;
  }

  if (event) { 
    return typeof event !== "string"
      ? JSON.stringify(event)
      : event;
  }

  return TRIVIAL_PARTITION_KEY
}

const deterministicPartitionKey = (event) => {
  const isPartitionKey = event && event.partitionKey;
  let key = stringifyEvent(event, isPartitionKey);

  if ((event && !isPartitionKey) || key.length > MAX_PARTITION_KEY_LENGTH) { 
    key = crypto.createHash("sha3-512").update(key).digest("hex");
  }
  
  return key;
};

module.exports = {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH
}
