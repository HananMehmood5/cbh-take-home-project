# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here: Thought Process

Refactoring the code has been an iterative effort: Gaining insights at the earlier rounds to make effort for the next round.

First looks of the code gives us two portions i.e getting the candidate value and then applying checks on the candidate. However, divining deep, Following were my thoughts against the final solution:

- Input parameter event can be dynamic: `none`, a string, an object, object with a `partitionKey` property.

- Output should be a `string` value having length less than `MAX_PARTITION_KEY_LENGTH`.

- Constants values should be outside of the function to avoid re-declaration of values.

- If event input have `partitionKey`, output varies depending on the length of the `partitionKey` property inside the event object.

  - If the length of `partitionKey` property (of the string or stringified version of it) is less than `MAX_PARTITION_KEY_LENGTH`, we will return `partitionKey` string or stringified version of it.

  - If the length of `partitionKey` property (of the string or stringified version of it) is greater than `MAX_PARTITION_KEY_LENGTH`, we will return hash value using former.

- If event input does't have `partitionKey`, we will return hash using event stringified version if the event is not a string.

- Going through the above insights, we can see the pattern:

  - We need to stringify the event `partitionKey` property or event itself if event doesn't have `partitionKey` property. -> `stringifyEvent`

  - We need to create hash based upon the stringified value if `partitionKey` does not property exists or length of above stringified value is greater than `MAX_PARTITION_KEY_LENGTH` -> Checks in the main function

  - As the result of the above two steps, we get our result.

## Results:

- More readability followed by code formatting, grouping wrt relevance while maintaining the original functionality.
- Easier to understand and test code.
