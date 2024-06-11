# Chainfile Ganache

> Ganache has been deprecated in favor of Hardhat.
> This Chainfile definition is created for legacy purposes only.

Part of the [Chainfile](https://chainfile.org) ecosystem,
this library provides a Docker image for running Ganache in a container for toolchain isolation.
This is particularly useful for language-agnostic development and parallelization of systems.

## `ganache-testcontainers`

This is a standalone testcontainers-node package for running Ganache in a container for testing purposes.
You don't need to use the Chainfile ecosystem to use this package.

```shell
npm i -D ganache-testcontainers viem
```

```typescript
import { afterAll, beforeAll, expect, it } from '@jest/globals';

import { GanacheClient, GanacheContainer, StartedGanacheContainer } from './index';

let container: StartedGanacheContainer;

beforeAll(async () => {
  container = await new GanacheContainer().start();
});

afterAll(async () => {
  await container.stop();
});

it('should rpc(eth_blockNumber) via viem', async () => {
  const client: GanacheClient = container.client;
  const blockNumber = await client.getBlockNumber();
  expect(blockNumber).toBeGreaterThanOrEqual(0n);
});
```

## License

MPL-2.0
